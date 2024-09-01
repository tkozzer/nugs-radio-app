<template>
  <div class="audio-player" :class="{ 'dark-mode': isDarkMode, 'controls-hidden': hideControls, 'mobile': isMobile }">
    <audio
      ref="audioRef"
      crossorigin="anonymous"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @play="playing = true"
      @pause="playing = false"
      @error="onAudioError"
    ></audio>
    <MustClickToStartModal
      :show="showStartModal"
      @start="startPlayback"
    />
    <div v-if="!hideControls" class="controls">
      <PlayPauseButton
        :playing="playing"
        :isDarkMode="isDarkMode"
        @toggle="togglePlay"
      />
      <ProgressBar
        :bufferInfo="bufferInfo"
        :currentTime="currentTime"
        :isLive="isLive"
        :isDarkMode="isDarkMode"
        @seek="onSeek"
        @goLive="goLive"
        @refreshPlayer="refreshPage"
      />
      <div class="right-controls">
        <VolumeControl
          v-model:volume="volume"
          :isDarkMode="isDarkMode"
          :isMobile="isMobile"
          @toggleMute="toggleMute"
        />
        <SettingsMenu
          :isDarkMode="isDarkMode"
          :hideControls="hideControls"
          @toggleDarkMode="toggleDarkMode"
          @toggleHideControls="toggleHideControls"
          @refreshPage="refreshPage"
        />
      </div>
    </div>
    <button v-if="hideControls" class="show-controls-btn" @click="toggleHideControls">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, reactive, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import MustClickToStartModal from './AudioPlayer/MustClickToStartModal.vue';
import SettingsMenu from './AudioPlayer/SettingsMenu.vue';
import VolumeControl from './AudioPlayer/VolumeControl.vue';
import PlayPauseButton from './AudioPlayer/PlayPauseButton.vue';
import ProgressBar from './AudioPlayer/ProgressBar.vue';

const props = defineProps({
  audioSource: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['manualPlay']);

const audioRef = ref(null);
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(0.5);
const previousVolume = ref(0.5);;

const initialBufferDuration = 5 * 60; // 5 minutes in seconds
const bufferDuration = ref(initialBufferDuration);
const streamStartTime = ref(null);

const isLive = ref(true);

const bufferInfo = reactive({
  start: 0,
  end: 0,
});

const lastKnownTime = ref(0);

const autoplaySucceeded = ref(true);

const isDarkMode = ref(true); // Set dark mode as default
const hideControls = ref(false);

const audioContext = ref(null);
const analyser = ref(null);
const dataArray = ref(new Uint8Array(0));

const showStartModal = ref(true);

const updateBufferDuration = () => {
  if (streamStartTime.value === null) return;
  
  const elapsedTime = (Date.now() - streamStartTime.value) / 1000;
  const newBufferDuration = Math.ceil(elapsedTime / initialBufferDuration) * initialBufferDuration;
  
  if (newBufferDuration > bufferDuration.value) {
    bufferDuration.value = newBufferDuration;
  }
};

const togglePlay = () => {
  const audio = audioRef.value;
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

const onTimeUpdate = () => {
  const audio = audioRef.value;
  if (audio) {
    if (streamStartTime.value === null) {
      streamStartTime.value = Date.now() - audio.currentTime * 1000;
    }
    
    updateBufferDuration();
    updateBufferInfo();
    
    // Only update currentTime if it's greater than the last known time
    if (audio.currentTime > lastKnownTime.value) {
      currentTime.value = audio.currentTime;
      lastKnownTime.value = audio.currentTime;
    }
    
    // Update isLive based on how close we are to the buffer end
    isLive.value = Math.abs(audio.currentTime - bufferInfo.end) < 5;
  }
};

const updateBufferInfo = () => {
  const audio = audioRef.value;
  if (audio && audio.buffered.length > 0) {
    const newStart = audio.buffered.start(0);
    const newEnd = audio.buffered.end(audio.buffered.length - 1);
    
    // Only update if there's a significant change
    if (Math.abs(newStart - bufferInfo.start) > 1 || Math.abs(newEnd - bufferInfo.end) > 1) {
      bufferInfo.start = newStart;
      bufferInfo.end = newEnd;
    }
  }
};

const onLoadedMetadata = () => {
  duration.value = audioRef.value.duration || Infinity;
};

const onSeek = (seekTime) => {
  const audio = audioRef.value;
  if (audio && audio.seekable.length > 0) {
    const seekPosition = Math.max(bufferInfo.start, Math.min(seekTime, bufferInfo.end));
    audio.currentTime = seekPosition;
    currentTime.value = seekPosition;
    lastKnownTime.value = seekPosition;
    isLive.value = Math.abs(seekPosition - bufferInfo.end) < 1;
  }
};

const onAudioError = (e) => {
  console.error('Audio error in AudioPlayer:', e);
  emit('error', e);
};

const toggleMute = () => {
  if (volume.value > 0) {
    previousVolume.value = volume.value;
    setVolume(0);
  } else {
    setVolume(previousVolume.value);
  }
};

const setVolume = (newVolume) => {
  newVolume = parseFloat(newVolume);
  volume.value = newVolume;
  if (audioRef.value) {
    audioRef.value.volume = newVolume;
    audioRef.value.muted = newVolume === 0;
  }
  if (newVolume > 0) {
    previousVolume.value = newVolume;
  }
};

const initializeAudio = () => {
  if (audioRef.value) {
    audioRef.value.src = props.audioSource;
    audioRef.value.volume = volume.value;
    audioRef.value.load();

    // Create AudioContext only if it doesn't exist
    if (!audioContext.value) {
      audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
      analyser.value = audioContext.value.createAnalyser();
      const source = audioContext.value.createMediaElementSource(audioRef.value);
      source.connect(analyser.value);
      analyser.value.connect(audioContext.value.destination);

      analyser.value.fftSize = 256;
      const bufferLength = analyser.value.frequencyBinCount;
      dataArray.value = new Uint8Array(bufferLength);
    }

    if (props.autoplay) {
      startPlayback();
    }
  }
};

const startPlayback = async () => {
  if (audioRef.value) {
    try {
      // Resume AudioContext if it's in suspended state
      if (audioContext.value && audioContext.value.state === 'suspended') {
        await audioContext.value.resume();
      }
      
      await audioRef.value.play();
      playing.value = true;
      autoplaySucceeded.value = true;
      showStartModal.value = false;
    } catch (error) {
      console.error('Playback failed:', error);
      autoplaySucceeded.value = false;
      showStartModal.value = true;
    }
  }
};

const goLive = () => {
  const audio = audioRef.value;
  if (audio) {
    audio.currentTime = bufferInfo.end;
    isLive.value = true;
    if (audio.paused) {
      audio.play().catch(error => {
        console.error('Failed to play after going live:', error);
      });
    }
  }
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const toggleHideControls = () => {
  hideControls.value = !hideControls.value;
};

const refreshPage = () => {
  if (audioRef.value) {
    const wasPlaying = !audioRef.value.paused;
    
    // Pause the audio and reset the source
    audioRef.value.pause();
    audioRef.value.src = '';
    
    // Set a new source with a cache-busting parameter
    audioRef.value.src = `${props.audioSource}?t=${Date.now()}`;
    
    // Load the new source
    audioRef.value.load();
    
    // Reset time-related values
    currentTime.value = 0;
    lastKnownTime.value = 0;
    streamStartTime.value = null;
    bufferInfo.start = 0;
    bufferInfo.end = 0;
    isLive.value = true;
    
    // If it was playing before, resume playback
    if (wasPlaying) {
      audioRef.value.play().catch(error => {
        console.error('Failed to resume playback after refresh:', error);
      });
    }
  }
};

// Expose audio data for parent components
const getAudioData = () => {
  if (analyser.value) {
    analyser.value.getByteFrequencyData(dataArray.value);
    return dataArray.value;
  }
  return new Uint8Array(0);
};

defineExpose({ getAudioData, startPlayback });

onMounted(() => {
  initializeAudio();
  if (audioRef.value) {
    audioRef.value.addEventListener('ended', () => {
      playing.value = false;
    });
  }
  
  // Add this event listener for handling visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.pause();
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});

const handleVisibilityChange = () => {
  if (!document.hidden && audioContext.value && audioContext.value.state === 'suspended') {
    audioContext.value.resume();
  }
};

watch(volume, (newVolume) => {
  if (audioRef.value) {
    audioRef.value.volume = newVolume;
    audioRef.value.muted = newVolume === 0;
  }
});

const { width } = useWindowSize();

const isMobile = computed(() => width.value < 641); // Adjust this breakpoint as needed

</script>

<style scoped>
.audio-player {
  @apply w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-2 rounded-full shadow-md flex items-center transition-all duration-300;
}

.audio-player.mobile {
  @apply fixed bottom-0 left-0 right-0 max-w-full rounded-none;
}

.audio-player.dark-mode {
  @apply bg-gray-800 text-white;
}

.controls {
  @apply flex items-center space-x-2 w-full;
}

.right-controls {
  @apply flex items-center space-x-2;
  margin-top: 5px; /* Add this line to bring the controls down slightly */
}

.audio-player.controls-hidden {
  @apply p-1 rounded-full max-w-[50%] mx-auto;
}

.show-controls-btn {
  @apply text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none mx-auto;
}

/* Ensure dark mode styles are applied */
.dark .volume-slider {
  @apply bg-gray-800;
}

.dark .volume-slider input[type="range"] {
  @apply bg-gray-600;
}

.dark .volume-slider input[type="range"]::-webkit-slider-thumb {
  @apply bg-gray-300;
}

.dark .volume-slider input[type="range"]::-moz-range-thumb {
  @apply bg-gray-300;
}
</style>
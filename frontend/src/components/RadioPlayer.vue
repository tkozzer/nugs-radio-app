<template>
  <div class="content">
    <LogoDisplay :logoImage="logoImage" :audioPlayerRef="audioPlayerRef" />
    <NowPlaying />
    <AudioPlayer 
      ref="audioPlayerRef" 
      :audioSource="audioSource" 
      :autoplay="false"
      @manualPlay="onManualPlay"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useAppStore } from '../stores/appStore';
import AudioPlayer from './AudioPlayer.vue';
import NowPlaying from './NowPlaying.vue';
import LogoDisplay from './LogoDisplay.vue';

const appStore = useAppStore();
const audioPlayerRef = ref(null);

// Add this computed property
const logoImage = computed(() => {
  // Return the appropriate logo image based on the current station
  switch (appStore.currentStationId) {
    case 2:
      return '/src/assets/images/phish-logo.png';
    case 4:
      return '/src/assets/images/pearl-jam-logo.png';
    case 1:
      return '/src/assets/images/shuffle-logo.png';
    default:
      return '/src/assets/images/default-logo.png';
  }
});

const audioSource = computed(() => {
  console.log('RadioPlayer: Computing audioSource. Current station ID:', appStore.currentStationId);
  switch (appStore.currentStationId) {
    case 2:
      return 'https://radio.nugs.net/phish';
    case 4:
      return 'https://radio.nugs.net/pearljam';
    case 1:
      return 'https://radio.nugs.net/shuffle';
    default:
      console.warn('RadioPlayer: Unknown station ID:', appStore.currentStationId);
      return '';
  }
});

const onManualPlay = () => {
  console.log('RadioPlayer: Manual play triggered');
  if (audioPlayerRef.value) {
    audioPlayerRef.value.startPlayback();
  } else {
    console.warn('RadioPlayer: audioPlayerRef is not available');
  }
};

// Watch for changes in currentStationId and update the audio source
watch(() => appStore.currentStationId, (newId) => {
  console.log('RadioPlayer: Station ID changed to:', newId);
  if (audioPlayerRef.value && audioPlayerRef.value.updateAudioSource) {
    console.log('RadioPlayer: Updating audio source to:', audioSource.value);
    audioPlayerRef.value.updateAudioSource(audioSource.value);
  } else {
    console.warn('RadioPlayer: audioPlayerRef is not available or updateAudioSource method is missing');
  }
}, { immediate: true });

onMounted(() => {
  console.log('RadioPlayer: Component mounted. Current station ID:', appStore.currentStationId);
});
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
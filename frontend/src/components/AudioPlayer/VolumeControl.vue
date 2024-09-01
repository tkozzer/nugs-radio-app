<template>
  <div class="volume-control relative" :class="{ 'dark': isDarkMode }">
    <button 
      class="volume-btn" 
      @click="handleVolumeClick"
      @dblclick="handleDoubleClick"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path v-if="!isMuted" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        <path v-else d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
      </svg>
    </button>
    <div v-if="showVolumeSlider && !isMobile" class="volume-slider absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white dark:bg-gray-800 p-2 rounded shadow-md">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="volume"
        class="w-24 h-1 bg-gray-200 dark:bg-gray-600 rounded-full appearance-none"
        @input="setVolume($event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  volume: {
    type: Number,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:volume', 'toggleMute']);

const showVolumeSlider = ref(false);
const isMuted = computed(() => props.volume === 0);
const previousVolume = ref(1);

const handleVolumeClick = () => {
  if (props.isMobile) {
    toggleMute();
  } else {
    toggleVolumeSlider();
  }
};

const handleDoubleClick = () => {
  if (!props.isMobile) {
    toggleMute();
  }
};

const toggleVolumeSlider = () => {
  if (!props.isMobile) {
    showVolumeSlider.value = !showVolumeSlider.value;
  }
};

const toggleMute = () => {
  if (isMuted.value) {
    emit('update:volume', previousVolume.value);
  } else {
    previousVolume.value = props.volume;
    emit('update:volume', 0);
  }
};

const setVolume = (newVolume) => {
  emit('update:volume', parseFloat(newVolume));
};

// Close volume slider when clicking outside
const handleClickOutside = (event) => {
  if (showVolumeSlider.value && !event.target.closest('.volume-control')) {
    showVolumeSlider.value = false;
  }
};

// Add and remove event listener
watch(showVolumeSlider, (newValue) => {
  if (newValue && !props.isMobile) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>

<style scoped>
.volume-control {
  @apply text-gray-600 hover:text-gray-800 focus:outline-none;
}

.volume-control.dark {
  @apply text-gray-300 hover:text-gray-100;
}

.volume-slider {
  @apply z-10;
}

.volume-slider input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-3 h-3 bg-gray-600 dark:bg-gray-300 rounded-full cursor-pointer;
}

.volume-slider input[type="range"]::-moz-range-thumb {
  @apply w-3 h-3 bg-gray-600 dark:bg-gray-300 rounded-full cursor-pointer border-none;
}
</style>
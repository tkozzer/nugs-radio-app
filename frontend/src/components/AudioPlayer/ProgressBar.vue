<template>
  <div class="progress-container">
    <input
      type="range"
      :min="bufferInfo.start"
      :value="currentTime"
      :max="bufferInfo.end"
      class="progress-bar"
      :style="progressBarStyle"
      @input="onSeek"
      @change="onSeek"
    />
    <TimeDisplay
      :currentTime="currentTime"
      :bufferEnd="bufferInfo.end"
      :isDarkMode="isDarkMode"
    />
    <LiveIndicator
      :isLive="isLive"
      @goLive="$emit('goLive')"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TimeDisplay from './TimeDisplay.vue';
import LiveIndicator from './LiveIndicator.vue';

const props = defineProps({
  bufferInfo: {
    type: Object,
    required: true
  },
  currentTime: {
    type: Number,
    required: true
  },
  isLive: {
    type: Boolean,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['seek', 'goLive']);

const onSeek = (event) => {
  emit('seek', parseFloat(event.target.value));
};

const progressBarStyle = computed(() => {
  const totalDuration = props.bufferInfo.end - props.bufferInfo.start;
  const bufferPercentage = totalDuration > 0 ? ((props.bufferInfo.end - props.bufferInfo.start) / totalDuration) * 100 : 0;
  const playbackPercentage = totalDuration > 0 ? ((props.currentTime - props.bufferInfo.start) / totalDuration) * 100 : 0;
  return {
    background: `linear-gradient(to right, 
      #4B5563 0%, 
      #4B5563 ${playbackPercentage}%, 
      #9CA3AF ${playbackPercentage}%, 
      #9CA3AF ${bufferPercentage}%, 
      #E5E7EB ${bufferPercentage}%, 
      #E5E7EB 100%)`
  };
});
</script>

<style scoped>
.progress-container {
  @apply flex-grow flex items-center space-x-2;
}

.progress-bar {
  @apply w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full appearance-none;
}

.progress-bar::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-gray-600 dark:bg-gray-300 rounded-full cursor-pointer;
}

.progress-bar::-moz-range-thumb {
  @apply w-4 h-4 bg-gray-600 dark:bg-gray-300 rounded-full cursor-pointer border-none;
}
</style>
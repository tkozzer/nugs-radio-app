<template>
  <div class="time-display" :class="{ 'dark': isDarkMode }">{{ formattedTime }}</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentTime: {
    type: Number,
    required: true
  },
  bufferEnd: {
    type: Number,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

const formattedTime = computed(() => {
  const timeBehind = props.bufferEnd - props.currentTime;
  const minutes = Math.floor(timeBehind / 60);
  const seconds = Math.floor(timeBehind % 60);
  return `-${minutes}:${seconds.toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.time-display {
  @apply text-xs text-gray-600 min-w-[40px] text-right;
}

.time-display.dark {
  @apply text-gray-400;
}
</style>
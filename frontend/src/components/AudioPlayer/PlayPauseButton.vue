<template>
  <button class="play-pause-btn" :class="{ 'dark': isDarkMode }" @click="$emit('toggle')">
    <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path d="M8 5v14l11-7z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  </button>
</template>

<script setup>
defineProps({
  playing: {
    type: Boolean,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle']);
</script>

<style scoped>
.play-pause-btn {
  @apply text-gray-600 hover:text-gray-800 focus:outline-none;
}

.play-pause-btn.dark {
  @apply text-gray-300 hover:text-gray-100;
}
</style>
<template>
  <button 
    :class="['live-indicator', { 'is-live': isLive }]" 
    @click="$emit('goLive')"
    @dblclick="$emit('refreshPlayer')"
  >
    LIVE
  </button>
</template>

<script setup>
defineProps({
  isLive: {
    type: Boolean,
    required: true
  }
});

defineEmits(['goLive', 'refreshPlayer']);
</script>

<style scoped>
.live-indicator {
  @apply text-xs font-bold ml-2 px-2 py-1 rounded cursor-pointer transition-colors duration-200;
  background-color: #D1D5DB; /* gray-300 */
  color: #4B5563; /* gray-600 */
}

.live-indicator.is-live {
  background-color: #EF4444; /* red-500 */
  color: white;
}

.live-indicator:hover {
  opacity: 0.9;
}

.live-indicator.is-live:hover {
  opacity: 0.9;
}
</style>
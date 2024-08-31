<template>
  <div class="now-playing">
    <h2 class="title">Now Playing:</h2>
    <p class="song-info">{{ songInfo }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const songInfo = ref('');

// Log the base URL to check if it's been picked up correctly
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const fetchSongInfo = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/current-song?id=2`);
    const data = await response.text();
    songInfo.value = data.trim();
  } catch (error) {
    console.error('Error fetching song info:', error);
    songInfo.value = 'Unable to fetch song information';
  }
};

let intervalId;

onMounted(() => {
  fetchSongInfo();
  intervalId = setInterval(fetchSongInfo, 30000); // Update every 30 seconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.now-playing {
  @apply text-center mb-4;
}

.title {
  @apply text-lg font-semibold mb-1 text-gray-100 dark:text-gray-300;
}

.song-info {
  @apply text-base text-gray-100 dark:text-gray-400;
}
</style>
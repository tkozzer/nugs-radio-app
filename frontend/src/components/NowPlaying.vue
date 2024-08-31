<template>
  <div class="now-playing">
    <h2 class="title">Now Playing:</h2>
    <p class="song-info">{{ songInfo }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const songInfo = ref('');

const fetchSongInfo = async () => {
  try {
    // Use a relative URL here
    const response = await fetch(`/api/current-song?id=2`);
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
<template>
  <div class="now-playing">
    <h2 class="title">Now Playing:</h2>
    <p class="song-info">{{ formattedSongInfo }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const songInfo = ref('');

const formattedSongInfo = computed(() => {
  if (songInfo.value.startsWith('PHISH:')) {
    return songInfo.value.substring(6).trim();
  }
  return songInfo.value;
});

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
  @apply text-center fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-50 py-2 pt-[50px];
}

.title {
  @apply text-sm font-semibold mb-1 text-gray-100 dark:text-gray-300;
}

.song-info {
  @apply text-xl font-bold text-gray-100 dark:text-gray-400;
  font-family: 'Helvetica Neue Condensed', 'Arial Narrow', Arial, sans-serif;
}
</style>
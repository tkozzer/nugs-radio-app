<template>
  <div class="starry-background">
    <div v-for="i in 100" :key="i" class="star" :style="starStyle()"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const musicIntensity = ref(0);

function starStyle() {
  const baseOpacity = 0.1 + Math.random() * 0.3; // Random base opacity between 0.1 and 0.4
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: baseOpacity + (musicIntensity.value * 0.2),
  };
}

// Simulated function to update music intensity
function updateMusicIntensity() {
  musicIntensity.value = Math.random(); // Full range: 0 to 1
}

let intervalId;

onMounted(() => {
  intervalId = setInterval(updateMusicIntensity, 200); // Update every 200ms for more responsive flickering
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.starry-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000009;
  overflow: hidden;
  z-index: -1;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  border-radius: 50%;
  transition: opacity 0.2s ease;
}
</style>
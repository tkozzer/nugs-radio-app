<template>
  <div v-if="isFullScreenPossible" class="full-screen-toggle" @click="toggleFullScreen">
    <svg v-if="!isFullScreen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isFullScreen = ref(false);
const isFullScreenPossible = ref(false);

function checkFullScreenPossibility() {
  isFullScreenPossible.value = !!(
    document.documentElement.requestFullscreen ||
    document.documentElement.mozRequestFullScreen ||
    document.documentElement.webkitRequestFullscreen ||
    document.documentElement.msRequestFullscreen
  );
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
}

function updateFullScreenState() {
  isFullScreen.value = !!(
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
}

onMounted(() => {
  checkFullScreenPossibility();
  document.addEventListener('fullscreenchange', updateFullScreenState);
  document.addEventListener('mozfullscreenchange', updateFullScreenState);
  document.addEventListener('webkitfullscreenchange', updateFullScreenState);
  document.addEventListener('MSFullscreenChange', updateFullScreenState);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', updateFullScreenState);
  document.removeEventListener('mozfullscreenchange', updateFullScreenState);
  document.removeEventListener('webkitfullscreenchange', updateFullScreenState);
  document.removeEventListener('MSFullscreenChange', updateFullScreenState);
});
</script>

<style scoped>
.full-screen-toggle {
  position: fixed;
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
  z-index: 9999999;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 5px;
  transition: all 0.3s ease;
}

.full-screen-toggle:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}
</style>
<script setup>
import { provide, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from './stores/appStore';
import PhishRadioPlayer from './components/PhishRadioPlayer.vue';
import StarryBackground from './components/StarryBackground.vue';
import FullScreenToggle from './components/FullScreenToggle.vue';
import FollowTheRabbit from './components/FollowTheRabbit.vue';

const fullScreenToggleRef = ref(null);
const route = useRoute();
const appStore = useAppStore();

const stationId = computed(() => {
  switch (route.name) {
    case 'phish':
      return 2;
    case 'pearl-jam':
      return 4;
    case 'shuffle':
      return 1;
    default:
      return 2; // Default to Phish
  }
});

// Watch for changes in stationId and update the store
watch(stationId, (newId) => {
  appStore.setCurrentStationId(newId);
});

provide('fullScreenToggle', () => {
  if (fullScreenToggleRef.value) {
    fullScreenToggleRef.value.toggleFullScreen();
  }
});

provide('isFullScreen', () => {
  return fullScreenToggleRef.value ? fullScreenToggleRef.value.isFullScreen : false;
});

provide('isFullScreenPossible', () => {
  return fullScreenToggleRef.value ? fullScreenToggleRef.value.isFullScreenPossible : false;
});

provide('stationId', stationId);
</script>

<template>
  <div class="app-container">
    <StarryBackground />
    <PhishRadioPlayer />
    <FullScreenToggle ref="fullScreenToggleRef" />
    <FollowTheRabbit />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.logo {
  height: 75vh;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

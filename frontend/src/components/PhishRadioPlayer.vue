<template>
  <div class="content">
    <img ref="logoRef" alt="Logo" class="logo" :src="logoImage" />
    <NowPlaying />
    <AudioPlayer 
      ref="audioPlayerRef" 
      :audioSource="audioSource" 
      :autoplay="false"
      @manualPlay="onManualPlay"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AudioPlayer from './AudioPlayer.vue';
import NowPlaying from './NowPlaying.vue';
import logoImage from '../assets/images/logo.png';

const audioSource = ref('https://radio.nugs.net/livephish');
const audioPlayerRef = ref(null);
const logoRef = ref(null);

let animationFrameId = null;

const animateLogo = () => {
  if (audioPlayerRef.value && logoRef.value) {
    const audioData = audioPlayerRef.value.getAudioData();
    const avgAmplitude = audioData.reduce((sum, value) => sum + value, 0) / audioData.length;
    const normalizedAmplitude = Math.min(avgAmplitude / 128, 1);
    
    const hue = Math.floor(normalizedAmplitude * 360);
    const saturation = 100; // Increased from 100 to 100 (max saturation)
    const lightness = 40 + normalizedAmplitude * 35; // Adjusted range from 50-75 to 40-75
    const alpha = 0.7 + normalizedAmplitude * 0.3; // Added alpha for more intensity
    
    logoRef.value.style.filter = `drop-shadow(0 0 15px hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha}))`;
  }
  
  animationFrameId = requestAnimationFrame(animateLogo);
};

onMounted(() => {
  animationFrameId = requestAnimationFrame(animateLogo);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

const onManualPlay = () => {
  if (audioPlayerRef.value) {
    audioPlayerRef.value.startPlayback();
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  height: 65vh; /* Reduced from 75vh to make room for NowPlaying component */
  margin-bottom: 10px; /* Reduced from 20px */
  transition: filter 0.05s ease-in-out; /* Reduced transition time for more responsive effect */
}
</style>
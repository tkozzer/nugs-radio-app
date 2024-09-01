<template>
  <div class="logo-container">
    <img ref="logoRef" alt="Logo" class="logo" :src="logoImage" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  logoImage: {
    type: String,
    required: true
  },
  audioPlayerRef: {
    type: Object,
    required: true
  }
});

const logoRef = ref(null);

let animationFrameId = null;

const animateLogo = () => {
  if (props.audioPlayerRef && logoRef.value) {
    const audioData = props.audioPlayerRef.getAudioData();
    const avgAmplitude = audioData.reduce((sum, value) => sum + value, 0) / audioData.length;
    const normalizedAmplitude = Math.min(avgAmplitude / 128, 1);
    
    const hue = Math.floor(normalizedAmplitude * 360);
    const saturation = 100;
    const lightness = 40 + normalizedAmplitude * 35;
    const alpha = 0.7 + normalizedAmplitude * 0.3;
    
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
</script>

<style scoped>
.logo-container {
  margin-bottom: 50px;
  width: 100%;
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  margin-bottom: 10px;
  transition: filter 0.05s ease-in-out;
}
</style>
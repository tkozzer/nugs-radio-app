<template>
  <div class="content">
    <LogoDisplay :logoImage="logoImage" :audioPlayerRef="audioPlayerRef" />
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
import { ref, inject } from 'vue';
import AudioPlayer from './AudioPlayer.vue';
import NowPlaying from './NowPlaying.vue';
import LogoDisplay from './LogoDisplay.vue';
import logoImage from '../assets/images/logo.png';

const audioSource = ref('https://radio.nugs.net/livephish');
const audioPlayerRef = ref(null);

const onManualPlay = () => {
  if (audioPlayerRef.value) {
    audioPlayerRef.value.startPlayback();
  }
};

const stationId = inject('stationId');

// Use stationId in your component logic
// ...
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
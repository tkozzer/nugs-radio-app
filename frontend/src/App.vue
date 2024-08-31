<script setup>
import PhishRadioPlayer from './components/PhishRadioPlayer.vue';
import StarryBackground from './components/StarryBackground.vue';
import FullScreenToggle from './components/FullScreenToggle.vue';
</script>

<template>
  <div class="app-container">
    <StarryBackground />
    <PhishRadioPlayer />
    <FullScreenToggle />
    <a href="https://radio.nugs.net/livephish" target="_blank" rel="noopener noreferrer" class="thank-you-message">
      Follow the 🐇!
    </a>
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

.thank-you-message {
  position: fixed;
  bottom: 10px;
  right: 10px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  transition: all 0.3s ease;
  z-index: 9999999;
  cursor: pointer;
}

.thank-you-message:hover {
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  padding: 10px 20px;
  bottom: 15px;
  right: 15px;
}
</style>

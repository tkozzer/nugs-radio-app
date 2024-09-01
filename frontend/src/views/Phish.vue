<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-4">Phish Radio</h1>
    <audio ref="audioPlayer" controls autoplay>
      <source :src="defaultStreamUrl" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <p class="mt-4">Now playing: Default Phish Radio Station</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '../stores/appStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const appStore = useAppStore()
const audioPlayer = ref(null)
const defaultStreamUrl = 'https://example.com/phish-radio-stream' // Replace with actual stream URL

onMounted(() => {
  appStore.setCurrentPhishId(route.params.id)
  // You can add any additional setup logic here
})

onUnmounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    audioPlayer.value.src = ''
  }
})
</script>
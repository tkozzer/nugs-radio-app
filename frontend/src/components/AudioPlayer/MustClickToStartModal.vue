<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div class="bg-gray-900 p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-blue-400 relative overflow-hidden">
        <div class="star-container absolute inset-0 pointer-events-none"></div>
        <h2 class="text-3xl font-bold mb-4 text-blue-300">Start the Journey</h2>
        <p class="mb-6 text-gray-300">Prepare to embark on a cosmic audio adventure. Click the button below to begin your sonic exploration.</p>
        <button 
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 relative z-10" 
          @click="startAudio"
        >
          Launch the Sound
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['start']);

const startAudio = () => {
  emit('start');
};

onMounted(() => {
  if (props.show) {
    createStars();
  }
});

function createStars() {
  const starContainer = document.querySelector('.star-container');
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starContainer.appendChild(star);
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.star-container {
  overflow: hidden;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  animation: twinkle 5s infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 0.2; transform: scale(1); }
}
</style>
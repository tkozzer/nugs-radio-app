<template>
  <div class="settings-menu relative" :class="{ 'dark': isDarkMode }">
    <button class="settings-btn" @click="toggleMenu">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <div v-if="showMenu" class="settings-dropdown absolute bottom-full right-0 mb-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
      <button class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left" @click="toggleDarkMode">
        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
      </button>
      <button class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left" @click="toggleHideControls">
        {{ hideControls ? 'Show Controls' : 'Hide Controls' }}
      </button>
      <button class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left" @click="refreshPage">
        Refresh Player
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

defineProps({
  isDarkMode: Boolean,
  hideControls: Boolean,
});

const emit = defineEmits(['toggleDarkMode', 'toggleHideControls', 'refreshPage']);

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const toggleDarkMode = () => {
  emit('toggleDarkMode');
};

const toggleHideControls = () => {
  emit('toggleHideControls');
};

const refreshPage = () => {
  emit('refreshPage');
};

// Close the menu when clicking outside
const handleClickOutside = (event) => {
  if (showMenu.value && !event.target.closest('.settings-menu')) {
    showMenu.value = false;
  }
};

// Add and remove event listener
watch(showMenu, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>

<style scoped>
.settings-menu {
  @apply text-gray-600 hover:text-gray-800 focus:outline-none;
}

.settings-menu.dark {
  @apply text-gray-300 hover:text-gray-100;
}

.settings-dropdown {
  @apply z-10;
}
</style>
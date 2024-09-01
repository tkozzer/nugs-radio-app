<template>
  <a :href="rabbitLink" target="_blank" rel="noopener noreferrer" :class="linkClass">
    Follow the 🐇!
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  selectedStream: {
    type: String,
    default: '2'
  },
  isMobile: {
    type: Boolean,
    default: false
  }
});

const rabbitLink = computed(() => `https://radio.nugs.net/index.html?sid=${props.selectedStream}`);

const linkClass = computed(() => {
  return props.isMobile
    ? 'settings-menu-link'
    : 'fixed-corner-link';
});
</script>

<style scoped>
.settings-menu-link {
  /* No additional styling needed as it inherits from the parent */
}

.fixed-corner-link {
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

.fixed-corner-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  padding: 10px 20px;
  bottom: 15px;
  right: 15px;
}

@media (max-width: 640px) {
  .fixed-corner-link {
    display: none; /* Hide on mobile */
  }
}
</style>
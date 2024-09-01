<template>
  <a href="https://radio.nugs.net/livephish" target="_blank" rel="noopener noreferrer" class="thank-you-message">
    Follow the 🐇!
  </a>
</template>

<script setup>
// No script needed for this simple component
</script>

<style scoped>
.thank-you-message {
  position: fixed;
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

/* Mobile styles */
@media (max-width: 640px) {
  .thank-you-message {
    display: none; /* Hide on mobile */
  }
}

/* Desktop styles */
@media (min-width: 641px) {
  .thank-you-message {
    bottom: 10px;
    right: 10px;
  }

  .thank-you-message:hover {
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 24px;
    padding: 10px 20px;
    bottom: 15px;
    right: 15px;
  }
}
</style>
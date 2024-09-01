<template>
  <div class="live-stream-source">
    <select v-model="selectedStream" @change="changeStream">
      <option value="1">nugs.net Radio</option>
      <option value="2">LivePhish Radio</option>
      <option value="4">Pearl Jam Radio</option>
    </select>
    <audio ref="audioPlayer" :src="streamUrl" controls></audio>
    <FollowTheRabbit :selectedStream="selectedStream" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import FollowTheRabbit from './FollowTheRabbit.vue';

export default {
  name: 'LiveStreamSource',
  components: {
    FollowTheRabbit
  },
  setup() {
    const selectedStream = ref('2'); // Default to LivePhish Radio
    const audioPlayer = ref(null);

    const streamUrls = {
      '1': 'https://radio.nugs.net/nugsnet',
      '2': 'https://radio.nugs.net/livephish',
      '4': 'https://radio.nugs.net/pearljam'
    };

    const streamUrl = computed(() => {
      return streamUrls[selectedStream.value];
    });

    const changeStream = () => {
      if (audioPlayer.value) {
        audioPlayer.value.load(); // Reload the audio element with the new source
        audioPlayer.value.play();
      }
    };

    return {
      selectedStream,
      audioPlayer,
      streamUrl,
      changeStream,
    };
  },
};
</script>

<style scoped>
.live-stream-source {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
}

audio {
  width: 100%;
  max-width: 300px;
}
</style>
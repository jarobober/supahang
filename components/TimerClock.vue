<script setup lang="ts">
const props = defineProps<{ config: any }>()

const isStarted = ref<boolean>(false)
</script>

<template>
  <TimerCountdown v-if="!isStarted" @end="isStarted = true" />
</template>

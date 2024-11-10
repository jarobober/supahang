<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
const emit = defineEmits(['end'])
const DEFAULT_COUNTDOWN_START = 6
const counter = ref<number>(DEFAULT_COUNTDOWN_START)
const countSound = new Audio('/audio/countdown.wav')

const { pause, resume, isActive } = useIntervalFn(
  () => {
    if (counter.value === DEFAULT_COUNTDOWN_START) {
      countSound.play()
    }

    if (counter.value > 1) {
      counter.value -= 1
    } else {
      pause()
      emit('end')
      resetCountdown()
    }
  },
  1000,
  { immediateCallback: true }
)

const resetCountdown = () => {
  counter.value = DEFAULT_COUNTDOWN_START
}
</script>

<template>
  <div id="countdown" class="text-8xl font-bold mt-32">{{ counter }}</div>
</template>

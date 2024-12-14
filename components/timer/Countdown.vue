<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { useCountdown } from '~/composables/useCountdown'

const { decrementTime } = useCountdown()
const emit = defineEmits(['end'])
const DEFAULT_COUNTDOWN_START = '00:05'
const counter = ref<string>(DEFAULT_COUNTDOWN_START)
const countSound = new Audio('/audio/countdown.wav')

const { pause, resume, isActive } = useIntervalFn(
  () => {
    if (counter.value === DEFAULT_COUNTDOWN_START) {
      countSound.play()
    }

    counter.value = decrementTime(counter.value, () => {
      pause()
      emit('end')
      resetCountdown()
    })
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

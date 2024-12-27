<script setup lang="ts">
import { DEFAULT_TIMERS } from '~/config/timer'
defineProps<{ config: Record<string, any> }>()
const items = [
  {
    label: 'Max hangs',
    slot: 'max-hangs',
  },
  {
    label: 'Repeaters',
    slot: 'repeaters',
  },
  {
    label: 'Custom',
    slot: 'custom',
  },
]

const isTimerRunning = ref(false)
const timer = ref()

const startTimer = (config: any) => {
  isTimerRunning.value = true
  timer.value = config
}
</script>

<template>
  <UCard class="min-h-[400px] w-[400px] relative" :ui="{ body: { base: 'h-full' } }">
    <TimerForm v-if="!isTimerRunning" :config :is-running="isTimerRunning" @start="startTimer" />
    <TimerClockComponent v-else :config="timer" @back="isTimerRunning = false" />
  </UCard>
</template>

<script setup lang="ts">
import { DEFAULT_TIMERS } from '~/config/timer'
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
  <UCard
    class="h-[540px] w-[400px]"
    :ui="{ body: { base: 'h-full flex flex-col items-center justify-between' } }"
  >
    <div v-if="!isTimerRunning">
      <UTabs :items="items" :ui="{ list: { tab: { font: 'font-light' } } }">
        <template #max-hangs
          ><TimerForm
            :config="{ ...DEFAULT_TIMERS.maxHangs }"
            :is-running="isTimerRunning"
            @start="startTimer"
        /></template>
        <template #repeaters
          ><TimerForm
            :config="{ ...DEFAULT_TIMERS.repeaters }"
            :is-running="isTimerRunning"
            @start="startTimer"
        /></template>
        <template #custom
          ><TimerForm
            :config="{ ...DEFAULT_TIMERS.custom }"
            :is-running="isTimerRunning"
            @start="startTimer"
        /></template>
      </UTabs>
    </div>
    <TimerClockComponent v-else :config="timer" @back="isTimerRunning = false" />
  </UCard>
</template>

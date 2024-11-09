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
</script>

<template>
  <UCard
    class="h-[540px] w-[400px]"
    :ui="{ body: { base: 'h-full flex flex-col items-center justify-between' } }"
  >
    <div>
      <UTabs :items="items" :ui="{ list: { tab: { font: 'font-light' } } }">
        <template #max-hangs><TimerForm :config="{ ...DEFAULT_TIMERS.maxHangs }" /></template>
        <template #repeaters><TimerForm :config="{ ...DEFAULT_TIMERS.repeaters }" /></template>
        <template #custom><TimerForm :config="{ ...DEFAULT_TIMERS.custom }" /></template>
      </UTabs>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { DEFAULT_TIMERS, SESSION_TYPES } from '~/config/timer'
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

const emit = defineEmits(['show-form'])

const goToForm = (config: any) => {
  console.log('config', config)
  emit('show-form', config)
}
</script>

<template>
  <UCard class="h-[500px] w-[440px] relative" :ui="{ body: { base: 'h-full text-left' } }">
    <div class="flex flex-col justify-between h-full">
      <div>
        <h1 class="text-4xl font-bold mb-2">Time to Hang</h1>
        <p class="text-slate-400">
          Welcome to Supahang, the hangboard timer that makes your workout smarter, not harder.
          Choose from predefined, adjustable types below or go custom.
        </p>
      </div>
      <div>
        <HeroSessionType
          v-for="(item, i) in SESSION_TYPES"
          :key="i"
          :type="item"
          class="mt-4"
          @click="goToForm(item)"
        />
      </div>
    </div>
  </UCard>
</template>

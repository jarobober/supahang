<script setup lang="ts">
defineProps<{ config: Record<string, any> }>()

const isTimerRunning = ref(false)
const timer = ref()

const startTimer = (config: any) => {
  isTimerRunning.value = true
  timer.value = config
}

const backToInit = () => {
  isTimerRunning.value = false
  emit('back')
}

const emit = defineEmits(['back'])
</script>

<template>
  <UCard class="h-[500px] w-[400px] relative" :ui="{ body: { base: 'h-full' } }">
    <TimerForm
      v-if="!isTimerRunning"
      :config
      :is-running="isTimerRunning"
      @start="startTimer"
      @back="backToInit"
    />
    <TimerClockComponent v-else :config="timer" @back="isTimerRunning = false" class="h-full" />
  </UCard>
</template>

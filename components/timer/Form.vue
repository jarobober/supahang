<script setup lang="ts">
const props = defineProps<{ config: any; isRunning: boolean }>()
const timer = ref(props.config)
const emit = defineEmits(['start'])
</script>

<template>
  <UForm v-if="!isRunning" :state="timer" class="space-y-4" @submit="emit('start', timer)">
    <UFormGroup label="Rep time" name="repTime" size="lg" class="mt-6">
      <UInput v-model="timer.repTime" type="time" min="00:00" max="59:59" class="mt-2" />
    </UFormGroup>
    <UFormGroup label="Rest time" name="restTime" size="lg" class="mt-6">
      <UInput v-model="timer.restTime" type="time" min="00:00" max="59:59" class="mt-2" />
    </UFormGroup>
    <UFormGroup label="Reps number" name="repsNumber" size="lg" class="mt-6">
      <TimerFormxRange v-model="timer.repsNumber" class="mt-2" />
    </UFormGroup>
    <UButton type="submit" size="lg" block class="!mt-8">Start</UButton>
  </UForm>
</template>

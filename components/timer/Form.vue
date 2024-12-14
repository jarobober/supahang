<script setup lang="ts">
const props = defineProps<{ config: any; isRunning: boolean }>()
const timer = ref(props.config)
const emit = defineEmits(['start'])
</script>

<template>
  <UForm v-if="!isRunning" :state="timer" class="space-y-4" @submit="emit('start', timer)">
    <UFormGroup label="Rep time" name="repTime">
      <UInput v-model="timer.repTime" type="time" min="00:00" max="59:59" />
    </UFormGroup>
    <UFormGroup label="Rest time" name="restTime">
      <UInput v-model="timer.repTime" type="time" min="00:00" max="59:59" />
    </UFormGroup>
    <UFormGroup label="Reps number" name="repsNumber">
      <UInput v-model="timer.repsNumber" type="number" />
    </UFormGroup>
    <UButton type="submit" size="xl">Start</UButton>
  </UForm>
</template>

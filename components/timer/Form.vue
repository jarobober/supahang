<script setup lang="ts">
import { object, string, number, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const timeValueValidate = (value: string) => {
  if (!value) return false
  const [minutes, seconds] = value.split(':').map(Number)
  const totalSeconds = minutes * 60 + seconds
  return totalSeconds >= 1
}

const schema = object({
  repTime: string()
    .required('Value is required')
    .test('min-time', 'Time must be greater than 0', timeValueValidate),
  restTime: string()
    .required('Value is required')
    .test('min-time', 'Time must be greater than 0', timeValueValidate),
  repsNumber: number().required('Value is required').moreThan(0, 'Number must be greater than 0'),
})

type Schema = InferType<typeof schema>

const props = defineProps<{ config: any; isRunning: boolean }>()
const timer = ref(props.config.timer)
const emit = defineEmits(['start', 'back'])

const submitForm = (event: FormSubmitEvent<Schema>) => {
  emit('start', event.data)
}
</script>

<template>
  <UForm v-if="!isRunning" :schema="schema" :state="timer" class="space-y-4" @submit="submitForm">
    <div class="flex">
      <UIcon name="i-ph-info" class="min-w-4 w-4 h-4 mr-1 text-slate-400" />
      <p class="text-sm text-left text-slate-400">{{ config.info }}</p>
    </div>
    <UFormGroup label="Rep time" name="repTime" size="lg" class="mt-6">
      <UInput v-model="timer.repTime" type="time" min="00:00" max="59:59" class="mt-2" />
    </UFormGroup>
    <UFormGroup label="Rest time" name="restTime" size="lg" class="mt-6">
      <UInput v-model="timer.restTime" type="time" min="00:00" max="59:59" class="mt-2" />
    </UFormGroup>
    <UFormGroup label="Reps number" name="repsNumber" size="lg" class="mt-6">
      <TimerFormxRange v-model="timer.repsNumber" class="mt-2" />
    </UFormGroup>
    <div class="flex overflow-hidden !mt-8">
      <UButton
        icon="i-heroicons-arrow-left"
        size="sm"
        color="primary"
        square
        variant="outline"
        label="Back"
        @click="emit('back')"
      />
      <UButton type="submit" size="lg" block class="shrink ml-4">Start</UButton>
    </div>
  </UForm>
</template>

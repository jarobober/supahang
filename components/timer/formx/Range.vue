<script lang="ts" setup>
import { defineModel } from 'vue'

const modelValue = defineModel({ type: Number })

const range = {
  min: 0,
  max: 20,
}

const handleInputChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  let newValue = Number(input.value)

  // Clamp the value
  if (isNaN(newValue)) {
    // If not a number, reset to min
    newValue = range.min
  } else {
    newValue = Math.min(Math.max(newValue, range.min), range.max)
  }

  modelValue.value = newValue
}
</script>

<template>
  <div class="flex items-center">
    <UInput v-model="modelValue" type="number" class="mr-2 w-[45px]" @input="handleInputChange" />
    <URange :min="range.min" :max="range.max" v-model="modelValue" />
  </div>
</template>

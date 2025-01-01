<script lang="ts" setup>
import { defineModel } from 'vue'

const modelValue = defineModel<number>()

const range = {
  min: 0,
  max: 20,
}
</script>

<template>
  <div class="flex items-center">
    <UInput v-model="modelValue" disabled type="number" class="mr-4 w-[53px]" />
    <URange :min="range.min" :max="range.max" v-model="modelValue" />
  </div>
</template>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>

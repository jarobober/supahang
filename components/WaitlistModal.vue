<script setup lang="ts">
import { object, string, boolean, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const isOpen = ref(false)

const state = reactive({
  email: undefined,
  consent: undefined,
})

const schema = object({
  email: string().email('Invalid email').required('Required'),
  consent: boolean()
    .oneOf([true], 'You must agree to the marketing consent')
    .required('You must agree to the marketing consent'),
})

type Schema = InferType<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <div class="p-4">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup name="consent">
            <label class="flex items-center space-x-2">
              <UCheckbox v-model="state.consent" />
              <span>I agree to the marketing consent</span>
            </label>
          </UFormGroup>

          <UButton type="submit"> Submit </UButton>
        </UForm>
      </div>
    </UModal>
  </div>
</template>

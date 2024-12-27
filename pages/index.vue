<script lang="ts" setup>
import { STEPS } from '~/types/enums'

const currentStep = ref(STEPS.INIT)
const formConfig = ref({})

const goToFormStep = (config: any) => {
  console.log('config', config)
  formConfig.value = config
  currentStep.value = STEPS.FORM
}

const resetStepInit = () => {
  currentStep.value = STEPS.INIT
}
</script>

<template>
  <HeroCard v-if="currentStep === STEPS.INIT" @show-form="goToFormStep" />
  <TimerCard v-if="currentStep === STEPS.FORM" :config="formConfig" @back="resetStepInit" />
</template>

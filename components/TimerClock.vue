<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
const props = defineProps<{ config: any }>()
defineEmits(['end'])
const repsCompleted = ref(0)
const letsGoSound = new Audio('/audio/lets-go.wav')
const isStarted = ref<boolean>(false)

const repTime = ref()
const setRepTime = () => {
  repTime.value = props.config.repTime
}

const {
  pause: pauseRep,
  resume: resumeRep,
  isActive: isActiveRep,
} = useIntervalFn(
  () => {
    if (repTime.value === props.config.repTime) {
      letsGoSound.play()
    }

    if (repTime.value > 0) {
      repTime.value -= 1
    } else {
      repsCompleted.value++
      pauseRep()
      if (repsCompleted.value === props.config.repsNumber) {
        console.log('end')
      } else {
        setRestTime()
        resumeRest()
      }
    }
  },
  1000,
  { immediate: false }
)

const restSound = new Audio('/audio/relax.wav')

const restTime = ref()
const setRestTime = () => {
  restTime.value = props.config.restTime
}

const {
  pause: pauseRest,
  resume: resumeRest,
  isActive: isActiveRest,
} = useIntervalFn(
  () => {
    if (restTime.value === props.config.restTime) {
      restSound.play()
    }

    if (restTime.value > 0) {
      restTime.value -= 1
    } else {
      pauseRest()
      setRepTime()
      resumeRep()
    }
  },
  1000,
  { immediate: false }
)

watch(repsCompleted, (val) => {
  if (val === props.config.repsNumber) {
  }
})

const runWorkout = () => {
  isStarted.value = true
  setRepTime()
  resumeRep()
}
</script>

<template>
  {{ config }}
  <TimerCountdown v-if="!isStarted" @end="runWorkout()" />
  <div v-else class="flex">
    <div class="w-1/3 flex flex-col">
      <div v-for="i in config.repsNumber" :key="i">
        <div class="w-[10px] h-[10px] bg-white mb-2"></div>
        <div v-if="i !== config.repsNumber" class="w-[10px] h-[10px] bg-black mb-2"></div>
      </div>
    </div>
    <div class="w-2/3">{{ isActiveRep ? repTime : restTime }}</div>
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { useCountdown } from '~/composables/useCountdown'

const props = defineProps<{ config: any }>()
const emit = defineEmits(['back'])
const { decrementTime } = useCountdown()
const repsCompleted = ref(0)
let letsGoSound: any
let completeSound: any
const isStarted = ref<boolean>(false)

const repTime = ref()
const setRepTime = () => {
  repTime.value = props.config.repTime
}

const repInterval = useIntervalFn(
  () => {
    repTime.value = decrementTime(repTime.value, () => {
      console.log('countdown finished')
      repInterval.pause()
      if (repsCompleted.value === props.config.repsNumber) {
        completeSound.play()
        emit('back')
      } else {
        setRestTime()
        restSound.play()
        restInterval.resume()
      }
    })
  },
  1000,
  { immediate: false }
)

let restSound: any

const restTime = ref()
const setRestTime = () => {
  restTime.value = props.config.restTime
}

const restInterval = useIntervalFn(
  () => {
    restTime.value = decrementTime(restTime.value, () => {
      console.log('rest finished')
      repsCompleted.value++
      restInterval.pause()
      setRepTime()
      letsGoSound.play()
      repInterval.resume()
    })
  },
  1000,
  { immediate: false }
)

const runWorkout = () => {
  isStarted.value = true
  setRepTime()
  letsGoSound.play()
  repInterval.resume()
}

onMounted(() => {
  letsGoSound = new Audio('/audio/lets-go.wav')
  completeSound = new Audio('/audio/complete.wav')
  restSound = new Audio('/audio/relax.wav')
})
</script>

<template>
  <!-- {{ config }}
  !!!! {{ repTime }} ??? {{ restTime }} -->
  <div>repInterval: {{ repInterval.isActive }}</div>
  <div>restInterval: {{ restInterval.isActive }}</div>
  <TimerCountdown v-if="!isStarted" @end="runWorkout()" />
  <div v-else class="flex">
    <div class="w-1/3 flex flex-col">
      <div v-for="i in config.repsNumber" :key="i">
        <TimerClockStepBox
          :rep-interval="repInterval"
          :rest-interval="restInterval"
          :reps-completed="repsCompleted"
          :with-rest="i !== config.repsNumber"
          :index="i - 1"
          :currentRep="i - 1 === repsCompleted"
        />
      </div>
    </div>
    <div v-if="repInterval.isActive.value" class="w-2/3">
      {{ repTime }}
    </div>
    <div v-if="restInterval.isActive.value" class="w-2/3">
      {{ restTime }}
    </div>
  </div>
</template>

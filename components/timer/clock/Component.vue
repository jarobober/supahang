<script setup lang="ts">
import { onUnmounted } from 'vue'
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
        repInterval.pause()
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

const resetWorkout = () => {
  isStarted.value = false
  repInterval.pause()
  restInterval.pause()
}

const isWorkoutPaused = computed(() => isRepPaused.value || isRestPaused.value)
const isRepPaused = ref(false)
const isRestPaused = ref(false)

const pauseWorkout = () => {
  if (repInterval.isActive.value) {
    repInterval.pause()
    isRepPaused.value = true
  } else if (restInterval.isActive.value) {
    restInterval.pause()
    isRestPaused.value = true
  }
}

const resumeWorkout = () => {
  if (isRepPaused.value) {
    repInterval.resume()
    isRepPaused.value = false
  } else if (isRestPaused.value) {
    restInterval.resume()
    isRestPaused.value = false
  }
}

onMounted(() => {
  letsGoSound = new Audio('/audio/lets-go.wav')
  completeSound = new Audio('/audio/complete.wav')
  restSound = new Audio('/audio/relax.wav')
})

onUnmounted(() => {
  repInterval.pause()
  restInterval.pause()
})
</script>

<template>
  <TimerCountdown v-if="!isStarted" @end="runWorkout()" class="w-full h-full" />
  <div v-else class="flex h-full">
    <div class="flex flex-col flex-wrap justify-center">
      <div v-for="i in config.repsNumber" :key="i">
        <TimerClockStepBox
          :rep-interval="repInterval"
          :rest-interval="restInterval"
          :rep-paused="isRepPaused"
          :rest-paused="isRestPaused"
          :reps-completed="repsCompleted"
          :with-rest="i !== config.repsNumber"
          :index="i - 1"
          :currentRep="i - 1 === repsCompleted"
        />
      </div>
    </div>
    <div class="flex-1 flex items-center justify-center relative">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 text-xl font-light opacity-50">
        {{ repInterval.isActive.value ? 'Hang' : 'Rest' }}
      </div>
      <div v-if="repInterval.isActive.value || isRepPaused" class="text-7xl font-bold tabular-nums">
        {{ repTime }}
      </div>
      <div
        v-if="restInterval.isActive.value || isRestPaused"
        class="text-7xl font-bold tabular-nums"
      >
        {{ restTime }}
      </div>
    </div>
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex pb-5 px-4 sm:p-6">
      <UButton
        icon="i-heroicons-arrow-left"
        size="sm"
        color="primary"
        square
        variant="outline"
        label="Back"
        @click="emit('back')"
      />
      <UButton
        icon="i-heroicons-arrow-path"
        size="sm"
        color="primary"
        square
        variant="outline"
        label="Start again"
        class="ml-4"
        @click="resetWorkout()"
      />
      <UButton
        :icon="isWorkoutPaused ? 'i-heroicons-play' : 'i-heroicons-pause'"
        size="lg"
        color="primary"
        square
        block
        :label="isWorkoutPaused ? 'Resume' : 'Pause'"
        class="shrink ml-4"
        @click="isWorkoutPaused ? resumeWorkout() : pauseWorkout()"
      />
    </div>
  </div>
</template>

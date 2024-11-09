<script setup lang="ts">
const { $gsap } = useNuxtApp()
const emit = defineEmits(['end'])
const counter = ref<number>(5)
const isCountingDown = ref<boolean>(false)
let countdownInterval: any = null
const countSound = new Audio('/countdown.wav')

// Function to start the countdown
const startCountdown = () => {
  if (isCountingDown.value) return

  countSound.play()
  console.log('startCountdown', countSound)

  isCountingDown.value = true
  countdownInterval = setInterval(() => {
    if (counter.value > 1) {
      counter.value -= 1
    } else {
      clearInterval(countdownInterval)
      isCountingDown.value = false
      emit('end')
    }
  }, 1000)
}

onMounted(() => {
  // $gsap.to('#countdown', { duration: 1, opacity: 0 })
  startCountdown()
})

onUnmounted(() => {
  clearInterval(countdownInterval)
})
</script>

<template>
  <div id="countdown" class="text-8xl font-bold mt-32">{{ counter }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  repInterval: Record<string, any>
  restInterval: Record<string, any>
  repPaused: boolean
  restPaused: boolean
  repsCompleted: number
  index: number
  withRest: boolean
  currentRep: boolean
}>()

watch(
  () => props.repInterval,
  () => {
    console.log('repInterval', props.repInterval)
    console.log('restInterval', props.restInterval)
  },
  { deep: true }
)
</script>

<template>
  <div
    :class="{
      'blinking-rep-animation': (repInterval.isActive.value || repPaused) && currentRep,
      'bg-emerald-500':
        (restInterval.isActive.value && index === repsCompleted) || index < repsCompleted,
    }"
    class="w-[20px] h-[20px] bg-[#1f2937] border border-slate-400 rounded mb-3 mr-3"
  ></div>
  <div
    v-if="withRest"
    :class="{
      'blinking-rest-animation': (restInterval.isActive.value || restPaused) && currentRep,
      'background-after-rest': index < repsCompleted,
    }"
    class="w-[20px] h-[20px] bg-[#1f2937] rounded mb-3 mr-3"
  ></div>
</template>

<style>
@keyframes blinking-rep {
  0%,
  100% {
    background-color: rgb(16 185 129);
  }
  50% {
    background-color: #1f2937;
  }
}

.blinking-rep-animation {
  animation: blinking-rep 1s infinite;
}

@keyframes blinking-rest {
  0%,
  100% {
    background-color: #111827;
  }
  50% {
    background-color: #1f2937;
  }
}

.blinking-rest-animation {
  animation: blinking-rest 1s infinite;
}

.background-after-rest {
  background-color: #111827;
}
</style>

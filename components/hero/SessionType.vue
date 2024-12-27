<script setup lang="ts">
defineProps<{ type: Record<string, any> }>()
</script>

<template>
  <UCard :ui="{ body: { background: 'bg-slate-800', padding: '!p-4' } }">
    <div class="flex items-center justify-between gap-4 h-full">
      <div class="bg-slate-700 rounded p-2 flex">
        <UIcon :name="type.icon" class="w-5 h-5" />
      </div>
      <div class="flex-1">
        <div class="font-semibold">{{ type.title }}</div>
        <div class="text-sm text-slate-300">{{ type.subtitle }}</div>
      </div>
      <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
    </div>
  </UCard>
</template>

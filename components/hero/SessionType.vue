<script setup lang="ts">
defineProps<{ type: Record<string, any> }>()
</script>

<template>
  <UCard
    :ui="{
      base: 'cursor-pointer group',
      ring: 'ring-0 hover:ring-2 dark:ring-primary-500',
      body: { background: 'bg-slate-800', padding: '!p-4', base: 'border-0 rounded-lg' },
    }"
  >
    <div class="flex items-center justify-between gap-4 h-full">
      <div class="bg-slate-700 rounded p-2 flex">
        <UIcon :name="type.icon" class="w-5 h-5" />
      </div>
      <div class="flex-1">
        <div class="font-semibold">{{ type.title }}</div>
        <div class="text-sm text-slate-400">{{ type.subtitle }}</div>
      </div>
      <UIcon
        name="i-heroicons-arrow-right"
        class="w-5 h-5 transition-all group-hover:translate-x-1"
      />
    </div>
  </UCard>
</template>

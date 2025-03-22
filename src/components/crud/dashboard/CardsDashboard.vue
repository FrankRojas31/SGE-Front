<template>
  <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-border bg-white">
    <div class="flex justify-between mb-4">
      <div>
        <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">
          {{ title }}
        </span>
        <div class="text-surface-900 dark:text-surface-0 font-medium !text-xl">
          {{ value }}
        </div>
      </div>
      <div :class="['flex items-center justify-center', bgColor, 'rounded-md w-10 h-10']">
        <i :class="['pi', icon, iconColor, '!text-xl']" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  value: string,
  icon: string,
  iconColor: string,
  bgColor: string,
}>();
</script>

<script lang="ts" setup>
import Message from 'primevue/message';

const props = defineProps<{
  message: string,
  severity: string,
  icon: string
}>();

</script>

<template>
  <Message :severity="props.severity" :icon="props.icon" class="p-2">{{ props.message }}</Message>
</template>

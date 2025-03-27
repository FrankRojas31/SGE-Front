<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import type { Groups } from '@/types/Groups';

const props = defineProps<{
  showModal: boolean;
  modalItem: Groups;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', group: Groups): void;
}>();

const errors = ref<Record<string, string>>({});

const validateFields = () => {
  errors.value = {}; // Limpiar errores al validar
  let isValid = true;

  if (!props.modalItem.nombre?.trim()) {
    errors.value.nombre = 'El nombre es requerido';
    isValid = false;
  }
  if (!props.modalItem.descripcion?.trim()) {
    errors.value.descripcion = 'La descripción es requerida';
    isValid = false;
  }

  return isValid;
};

const HandleUpdate = () => {
  // Limpiar errores antes de hacer el envío
  errors.value = {};
  
  if (validateFields()) {
    emit('update', props.modalItem);
  }
};

const HandleCancel = () => {
  errors.value = {}; // Limpiar los errores cuando se cancela
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Grupo" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    
    <!-- Nombre del Grupo -->
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre del Grupo</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ingresa el nombre del grupo" class="w-full"
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="props.modalItem.descripcion" placeholder="Ingresa la descripción del grupo" class="w-full"
        :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Actualizar" severity="success" @click="HandleUpdate" />
    </template>
  </Dialog>
</template>

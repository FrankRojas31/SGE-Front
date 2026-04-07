<script lang="ts" setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import type { Units } from '@/types/Unit';

const props = defineProps<{
  showModal: boolean;
  modalItem: Units;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', course: Units): void;
}>();

const errors = ref<Record<string, string>>({});

const validateFields = () => {
  errors.value = {};
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
  if (validateFields()) {
    emit('update', props.modalItem);
  }
};

const HandleCancel = () => {
  emit('close');
  errors.value = {};
};

// Limpiar errores cuando se abre el modal
watch(() => props.showModal, (newVal) => {
  if (newVal) errors.value = {};
});

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Unidad" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Unidad I" class="w-full"
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="props.modalItem.descripcion" placeholder="Desarrollo de actividades de Ciberseguridad" 
        class="w-full" :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Actualizar" severity="success" @click="HandleUpdate" />
    </template>
  </Dialog>
</template>

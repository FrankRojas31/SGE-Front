<script lang="ts" setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { ISubject } from '@/types/Subject';

const props = defineProps<{
  showModal: boolean;
  modalItem: ISubject;
}>();

const errors = ref<Record<string, string>>({});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', subject: ISubject): void;
}>();

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

// Limpiar errores cuando se actualizan los valores del modal
watch(() => props.modalItem, () => {
  errors.value = {};
}, { deep: true });

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Materia" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg">
    
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ciencias Naturales II" fluid 
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="props.modalItem.descripcion" placeholder="Esta materia es para fomentar la naturaleza" fluid 
        :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Guardar" severity="success" @click="HandleUpdate" />
    </template>

  </Dialog>
</template>

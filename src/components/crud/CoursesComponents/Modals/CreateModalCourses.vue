<script lang="ts" setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import type { Courses } from '@/types/Courses';

const modalItem = ref<Courses>({} as Courses);
const errors = ref<Record<string, string>>({});

const props = defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', course: Courses): void;
}>();

const validateFields = () => {
  errors.value = {};
  let isValid = true;

  if (!modalItem.value.nombre?.trim()) {
    errors.value.nombre = 'El nombre es requerido';
    isValid = false;
  }
  if (!modalItem.value.descripcion?.trim()) {
    errors.value.descripcion = 'La descripción es requerida';
    isValid = false;
  }

  return isValid;
};

const HandleCreate = () => {
  if (validateFields()) {
    emit('create', modalItem.value);
    modalItem.value = {} as Courses;
  }
};

const HandleCancel = () => {
  modalItem.value = {} as Courses;
  errors.value = {};
  emit('close');
};

// Limpiar errores al abrir el modal
watch(() => props.showModal, (newVal) => {
  if (newVal) errors.value = {};
});
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Curso" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre del Curso</label>
      <InputText v-model="modalItem.nombre" placeholder="Ingresa el nombre del curso" class="w-full"
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Ingresa la descripción del curso" class="w-full"
        :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

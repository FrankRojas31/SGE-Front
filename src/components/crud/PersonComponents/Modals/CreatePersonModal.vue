<script setup lang="ts">
import { ref } from 'vue';
import type { IPerson } from '@/types/Persons';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';

const props = defineProps<{
  showModal: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', person: IPerson): void
}>();

const modalItem = ref<IPerson>({} as IPerson);
const errors = ref<Record<string, string>>({});

const validateFields = () => {
  errors.value = {};
  let isValid = true;

  if (!modalItem.value.nombre?.trim()) {
    errors.value.nombre = 'El nombre es requerido';
    isValid = false;
  }
  if (!modalItem.value.apellidoPaterno?.trim()) {
    errors.value.apellidoPaterno = 'El apellido paterno es requerido';
    isValid = false;
  }
  if (!modalItem.value.apellidoMaterno?.trim()) {
    errors.value.apellidoMaterno = 'El apellido materno es requerido';
    isValid = false;
  }
  if (!modalItem.value.fechaNacimiento) {
    errors.value.fechaNacimiento = 'La fecha de nacimiento es requerida';
    isValid = false;
  }

  return isValid;
};

const HandleCreate = () => {
  if (validateFields()) {
    emit('create', modalItem.value);
    modalItem.value = {} as IPerson;
  }
};

const HandleCancel = () => {
  modalItem.value = {} as IPerson;
  errors.value = {};
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Persona" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.nombre" placeholder="Ej: Juan" class="w-full" 
        :class="{ 'p-invalid': errors.nombre }" />
        <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Paterno</label>
      <InputText v-model="modalItem.apellidoPaterno" placeholder="Ej: Pérez" class="w-full"
        :class="{ 'p-invalid': errors.apellidoPaterno }" />
        <small v-if="errors.apellidoPaterno" class="text-red-500 text-sm mt-1">{{ errors.apellidoPaterno }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Materno</label>
      <InputText v-model="modalItem.apellidoMaterno" placeholder="Ej: Gómez" class="w-full"
        :class="{ 'p-invalid': errors.apellidoMaterno }" />
      <small v-if="errors.apellidoMaterno" class="text-red-500 text-sm mt-1">{{ errors.apellidoMaterno }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Nacimiento</label>
      <DatePicker v-model="modalItem.fechaNacimiento" placeholder="Selecciona la fecha de Nacimiento"
        :showOnFocus="true" showIcon class="w-full"
        :class="{ 'p-invalid': errors.fechaNacimiento }" />
      <small v-if="errors.fechaNacimiento" class="text-red-500 text-sm mt-1">{{ errors.fechaNacimiento }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>
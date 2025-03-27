<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import type { IPerson } from '@/types/Persons';
import { ref, watch } from 'vue';

const props = defineProps<{
  showModal: boolean;
  modalItem: IPerson;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', person: IPerson): void;
}>();

const dateBorn = ref(new Date(props.modalItem.fechaNacimiento));
const errors = ref<Record<string, string>>({});

watch(() => props.modalItem.fechaNacimiento, (newDate) => {
  dateBorn.value = new Date(newDate);
});

const validateFields = () => {
  errors.value = {};
  let isValid = true;

  if (!props.modalItem.nombre?.trim()) {
    errors.value.nombre = 'El nombre es requerido';
    isValid = false;
  }
  if (!props.modalItem.apellidoPaterno?.trim()) {
    errors.value.apellidoPaterno = 'El apellido paterno es requerido';
    isValid = false;
  }
  if (!props.modalItem.apellidoMaterno?.trim()) {
    errors.value.apellidoMaterno = 'El apellido materno es requerido';
    isValid = false;
  }
  if (!dateBorn.value) {
    errors.value.fechaNacimiento = 'La fecha de nacimiento es requerida';
    isValid = false;
  }

  return isValid;
};

const HandleUpdate = () => {
  if (validateFields()) {
    props.modalItem.fechaNacimiento = dateBorn.value;
    emit('update', props.modalItem);
  }
};

const HandleCancel = () => {
  errors.value = {};
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Persona" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ej. Juan" class="w-full"
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Paterno</label>
      <InputText v-model="props.modalItem.apellidoPaterno" placeholder="Ej. Pérez" class="w-full"
        :class="{ 'p-invalid': errors.apellidoPaterno }" />
      <small v-if="errors.apellidoPaterno" class="text-red-500 text-sm mt-1">{{ errors.apellidoPaterno }}</small>
    </div>
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Materno</label>
      <InputText v-model="props.modalItem.apellidoMaterno" placeholder="Ej. Gómez" class="w-full"
        :class="{ 'p-invalid': errors.apellidoMaterno }" />
      <small v-if="errors.apellidoMaterno" class="text-red-500 text-sm mt-1">{{ errors.apellidoMaterno }}</small>
    </div>
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Nacimiento</label>
      <DatePicker v-model="dateBorn" placeholder="Selecciona la fecha de Nacimiento" :showOnFocus="true" showIcon
        class="w-full" :class="{ 'p-invalid': errors.fechaNacimiento }" />
      <small v-if="errors.fechaNacimiento" class="text-red-500 text-sm mt-1">{{ errors.fechaNacimiento }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Guardar" severity="success" @click="HandleUpdate" />
    </template>
  </Dialog>
</template>
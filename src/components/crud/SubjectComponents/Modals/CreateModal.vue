<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { ISubject } from '@/types/Subject';

const modalItem = ref<ISubject>({} as ISubject);
const errors = ref<Record<string, string>>({});

const props = defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', subject: ISubject): void;
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
    modalItem.value = {} as ISubject;
  }
};

const HandleCancel = () => {
  emit('close');
  modalItem.value = {} as ISubject;
  errors.value = {};
};

const HandleVisibleChange = (visible: boolean) => {
  if (!visible) {
    modalItem.value = {} as ISubject;
    errors.value = {};
    emit('close');
  }
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Registro" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleVisibleChange">
    
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.nombre" placeholder="Ciencias Naturales II" fluid 
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Esta materia es para fomentar la naturaleza" fluid 
        :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>

  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import type { Groups } from '@/types/Groups';

const modalItem = ref<Groups>({} as Groups);
const errors = ref<Record<string, string>>({});

const props = defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', group: Groups): void;
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
  
  errors.value = {};
  
  if (validateFields()) {
    emit('create', modalItem.value);
    modalItem.value = {} as Groups;
  }
};

const HandleCancel = () => {
  modalItem.value = {} as Groups;
  errors.value = {};
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Grupo" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre del Grupo</label>
      <InputText v-model="modalItem.nombre" placeholder="Ingresa el nombre del grupo" class="w-full"
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Ingresa la descripción del grupo" class="w-full"
        :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { Units } from '@/types/Unit';

const modalItem = ref<Units>({} as Units);

const props = defineProps<{
  showModal: boolean;
  id: number;
}>();

const errors = ref<Record<string, string>>({});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', unit: Units): void;
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
    modalItem.value.idMateria = props.id;
    emit('create', modalItem.value);
    modalItem.value = {} as Units;
  }
};

const HandleCancel = () => {
  emit('close');
  modalItem.value = {} as Units;
  errors.value = {};
};

// Limpiar errores cuando se abre el modal
watch(() => props.showModal, (newVal) => {
  if (newVal) errors.value = {};
});

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Unidad" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg">
    
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.nombre" placeholder="Unidad I" fluid 
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Desarrollo de actividades de Ciberseguridad" fluid 
        :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>

  </Dialog>
</template>

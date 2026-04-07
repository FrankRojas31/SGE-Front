<script lang="ts" setup>
import { ref, computed } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { estatusPeriodo, type IPeriods } from '@/types/Periods';

const props = defineProps<{
  showModal: boolean;
  modalItem?: IPeriods;
}>();

const modalItem = ref<IPeriods>({} as IPeriods);
const errors = ref<Record<string, string>>({});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', item: IPeriods): void;
}>();

const statusOptions = computed(() =>
  Object.entries(estatusPeriodo)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key.replace("_", " "),
      value: Number(value)
    }))
);

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
  if (!modalItem.value.fechaInicio) {
    errors.value.fechaInicio = 'La fecha de inicio es requerida';
    isValid = false;
  }
  if (!modalItem.value.fechaFin) {
    errors.value.fechaFin = 'La fecha de fin es requerida';
    isValid = false;
  }
  if (modalItem.value.fechaInicio && modalItem.value.fechaFin) {
    const inicio = new Date(modalItem.value.fechaInicio);
    const fin = new Date(modalItem.value.fechaFin);

    if (inicio > fin) {
      errors.value.fechaInicio = 'La fecha de inicio no puede ser mayor a la fecha de fin';
      errors.value.fechaFin = 'La fecha de fin no puede ser menor a la fecha de inicio';
      isValid = false;
    }
  }
  if (modalItem.value.estatusPeriodo === undefined || modalItem.value.estatusPeriodo === null) {
    errors.value.estatusPeriodo = 'El estado es requerido';
    isValid = false;
  }

  return isValid;
};

const HandleCreate = () => {
  if (validateFields()) {
    emit('create', modalItem.value);
    errors.value = {};
  }
};

const HandleCancel = () => {
  emit('close');
  modalItem.value = {} as IPeriods;
  errors.value = {};
};

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Período" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.nombre" placeholder="Ingrese el nombre del período" class="w-full"
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Ingrese una descripción" class="w-full"
        :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Inicio</label>
      <DatePicker v-model="modalItem.fechaInicio" placeholder="Selecciona la fecha de inicio"
        :showOnFocus="true" showIcon class="w-full"
        :class="{ 'p-invalid': errors.fechaInicio }" />
      <small v-if="errors.fechaInicio" class="text-red-500 text-sm mt-1">{{ errors.fechaInicio }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Fin</label>
      <DatePicker v-model="modalItem.fechaFin" placeholder="Selecciona la fecha de fin"
        :showOnFocus="true" showIcon class="w-full"
        :class="{ 'p-invalid': errors.fechaFin }" />
      <small v-if="errors.fechaFin" class="text-red-500 text-sm mt-1">{{ errors.fechaFin }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Estado</label>
      <Select :options="statusOptions" optionLabel="label" optionValue="value" v-model="modalItem.estatusPeriodo"
        class="w-full" :class="{ 'p-invalid': errors.estatusPeriodo }" />
      <small v-if="errors.estatusPeriodo" class="text-red-500 text-sm mt-1">{{ errors.estatusPeriodo }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

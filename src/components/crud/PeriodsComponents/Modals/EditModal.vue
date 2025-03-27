<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { type IPeriods, estatusPeriodo } from '@/types/Periods';

const props = defineProps<{
  showModal: boolean;
  modalItem: IPeriods;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', period: IPeriods): void;
}>();

const statusOptions = computed(() =>
  Object.entries(estatusPeriodo)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key.replace("_", " "),
      value: Number(value)
    }))
);

const dateFirst = ref(new Date(props.modalItem.fechaInicio));
const dateEnd = ref(new Date(props.modalItem.fechaFin));
const errors = ref<Record<string, string>>({});

watch(() => props.modalItem.fechaInicio, (newVal) => {
  dateFirst.value = new Date(newVal);
});

watch(() => props.modalItem.fechaFin, (newVal) => {
  dateEnd.value = new Date(newVal);
});

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
  if (!props.modalItem.fechaInicio) {
    errors.value.fechaInicio = 'La fecha de inicio es requerida';
    isValid = false;
  }
  if (!props.modalItem.fechaFin) {
    errors.value.fechaFin = 'La fecha de fin es requerida';
    isValid = false;
  }
  if (props.modalItem.fechaInicio && props.modalItem.fechaFin) {
    const inicio = new Date(props.modalItem.fechaInicio);
    const fin = new Date(props.modalItem.fechaFin);

    if (inicio > fin) {
      errors.value.fechaInicio = 'La fecha de inicio no puede ser mayor a la fecha de fin';
      errors.value.fechaFin = 'La fecha de fin no puede ser menor a la fecha de inicio';
      isValid = false;
    }
  }
  if (props.modalItem.estatusPeriodo === undefined || props.modalItem.estatusPeriodo === null) {
    errors.value.estatusPeriodo = 'El estado es requerido';
    isValid = false;
  }

  return isValid;
};

const HandleEdit = () => {
  if (validateFields()) {
    emit('update', props.modalItem);
  }
};

const HandleCancel = () => {
  emit('close');
};

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Período" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ingrese el nombre del período" class="w-full"
        :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="props.modalItem.descripcion" placeholder="Ingrese una descripción" class="w-full"
        :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Inicio</label>
      <DatePicker v-model="dateFirst" :showOnFocus="true" showIcon class="w-full" placeholder="Selecciona la fecha de inicio"
        :class="{ 'p-invalid': errors.fechaInicio }" />
      <small v-if="errors.fechaInicio" class="text-red-500 text-sm mt-1">{{ errors.fechaInicio }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Fin</label>
      <DatePicker v-model="dateEnd" :showOnFocus="true" showIcon class="w-full" placeholder="Selecciona la fecha de fin"
        :class="{ 'p-invalid': errors.fechaFin }" />
      <small v-if="errors.fechaFin" class="text-red-500 text-sm mt-1">{{ errors.fechaFin }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Estado</label>
      <Select :options="statusOptions" optionLabel="label" optionValue="value" class="w-full"
        v-model="props.modalItem.estatusPeriodo" :class="{ 'p-invalid': errors.estatusPeriodo }" />
      <small v-if="errors.estatusPeriodo" class="text-red-500 text-sm mt-1">{{ errors.estatusPeriodo }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Guardar" severity="success" @click="HandleEdit" />
    </template>
  </Dialog>
</template>

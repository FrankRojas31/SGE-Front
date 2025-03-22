<script lang="ts" setup>
import { computed } from 'vue';
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

const statusOptions = computed(() =>
  Object.entries(estatusPeriodo)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key.replace("_", " "),
      value: Number(value)
    }))
);

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Período" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ingrese el nombre del período" fluid class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="props.modalItem.descripcion" placeholder="Ingrese una descripción" fluid class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Inicio</label>
      <DatePicker v-model="props.modalItem.fechaInicio" :showOnFocus="true" showIcon fluid class="w-full"
        placeholder="Selecciona la fecha de inicio" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Fin</label>
      <DatePicker v-model="props.modalItem.fechaFin" :showOnFocus="true" showIcon fluid class="w-full"
        placeholder="Selecciona la fecha de fin" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">
        Estado
      </label>
      <Select :options="statusOptions" optionLabel="label" optionValue="value"
        v-model="props.modalItem.estatusPeriodo" />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="$emit('close')" />
      <Button label="Guardar" severity="success" @click="$emit('update', props.modalItem)" />
    </template>
  </Dialog>
</template>

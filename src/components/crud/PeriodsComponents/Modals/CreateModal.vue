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
}>();

const modalItem = ref<IPeriods>({} as IPeriods)

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

const HandleCreate = () => {
  emit('create', modalItem.value);
};

const HandleCancel = () => {
  modalItem.value = {} as IPeriods;
  emit('close');
};

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Período" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.nombre" placeholder="Ingrese el nombre del período" fluid class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Ingrese una descripción" fluid class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Inicio</label>
      <DatePicker v-model="modalItem.fechaInicio" :showOnFocus="true" showIcon fluid class="w-full"
        placeholder="Selecciona la fecha de inicio" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Fin</label>
      <DatePicker v-model="modalItem.fechaFin" :showOnFocus="true" showIcon fluid class="w-full"
        placeholder="Selecciona la fecha de fin" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">
        Estado
      </label>
      <Select :options="statusOptions" optionLabel="label" optionValue="value" v-model="modalItem.estatusPeriodo"
        fluid />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

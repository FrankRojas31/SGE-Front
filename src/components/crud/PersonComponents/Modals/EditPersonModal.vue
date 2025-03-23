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

const fechaNacimiento = ref(new Date(props.modalItem.fechaNacimiento));

watch(() => props.modalItem.fechaNacimiento, (newDate) => {
  fechaNacimiento.value = new Date(newDate);
});

const HandleUpdate = () => {
  props.modalItem.fechaNacimiento = fechaNacimiento.value;
  emit('update', props.modalItem)
}

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Persona" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ej. Juan" fluid />
    </div>
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Paterno</label>
      <InputText v-model="props.modalItem.apellidoPaterno" placeholder="Ej. Pérez" fluid />
    </div>
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Materno</label>
      <InputText v-model="props.modalItem.apellidoMaterno" placeholder="Ej. Gómez" fluid />
    </div>
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Nacimiento</label>
      <DatePicker v-model="fechaNacimiento" :showOnFocus="true" showIcon class="w-full" required />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="$emit('close')" />
      <Button label="Guardar" severity="success" @click="HandleUpdate" />
    </template>
  </Dialog>
</template>

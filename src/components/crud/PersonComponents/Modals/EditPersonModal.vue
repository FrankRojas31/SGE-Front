<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { IPerson } from '@/types/Persons';

const props = defineProps<{
  showModal: boolean;
  modalItem: IPerson;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'update', person: IPerson): void;
}>();
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
      <InputText v-model="props.modalItem.fechaNacimiento" placeholder="YYYY-MM-DD" fluid />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="$emit('close')" />
      <Button label="Guardar" severity="success" @click="$emit('update', props.modalItem)" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { ISubject } from '@/types/Subject';

const props = defineProps<{
  showModal: boolean;
  modalItem: ISubject;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'update', student: ISubject): void;
}>();
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Materia" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ciencias Naturales II" fluid />
    </div>
    <div class=" mb-4">
        <label class="block text-gray-600 text-lg font-medium">Descripción</label>
        <InputText v-model="props.modalItem.descripcion" placeholder="Esta materia es para fomentar la naturaleza"
          fluid />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="$emit('close')" />
      <Button label="Crear" severity="success" @click="$emit('update', props.modalItem)" />
    </template>
  </Dialog>
</template>

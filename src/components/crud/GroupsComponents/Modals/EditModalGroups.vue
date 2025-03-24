<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import type { Groups } from '@/types/Groups';

const props = defineProps<{
  showModal: boolean;
  modalItem: Groups;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', group: Groups): void;
}>();

const HandleUpdate = () => {
  emit('update', props.modalItem);
};

const HandleCancel = () => {
  emit('close');
};

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Grupo" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    <!-- Nombre del Grupo -->
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre del Grupo</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ingresa el nombre del grupo" class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="props.modalItem.descripcion" placeholder="Ingresa la descripción del grupo" class="w-full" />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Actualizar" severity="success" @click="HandleUpdate" />
    </template>
  </Dialog>
</template>

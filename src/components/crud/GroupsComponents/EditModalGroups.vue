<script lang="ts" setup>
import { ref, watch } from 'vue';
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
const editableItem = ref<Groups>({ ...props.modalItem });
watch(
  () => props.showModal,
  (newVal) => {
    if (newVal) {
      editableItem.value = { ...props.modalItem };
    }
  }
);

const handleClose = () => {
  emit('close');
};

const handleUpdate = () => {
  emit('update', editableItem.value);
  handleClose();
};
</script>

<template>
  <Dialog
    v-model:visible="props.showModal"
    header="Editar Grupo"
    modal
    :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg"
    @update:visible="handleClose"
  >
    <!-- Nombre del Grupo -->
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre del Grupo</label>
      <InputText v-model="editableItem.nombre" placeholder="Ingresa el nombre del grupo" class="w-full" />
    </div>

    <!-- Descripción -->
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="editableItem.descripcion" placeholder="Ingresa la descripción del grupo" class="w-full" />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="handleClose" />
      <Button label="Actualizar" severity="success" @click="handleUpdate" />
    </template>
  </Dialog>
</template>

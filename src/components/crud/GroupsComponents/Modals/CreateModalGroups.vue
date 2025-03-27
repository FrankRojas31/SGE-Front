<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import type { Groups } from '@/types/Groups';

const modalItem = ref<Groups>({} as Groups);
const props = defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', group: Groups): void;
}>();

const HandleCreate = () => {
  emit('create', modalItem.value);
  modalItem.value = {} as Groups;
};

const HandleCancel = () => {
  modalItem.value = {} as Groups;
  emit('close');
};

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Grupo" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre del Grupo</label>
      <InputText v-model="modalItem.nombre" placeholder="Ingresa el nombre del grupo" class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Ingresa la descripción del grupo" class="w-full" />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { Units } from '@/types/Unit';

const modalItem = ref<Units>({} as Units);

const props = defineProps<{
  showModal: boolean;
  id: number;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', student: Units): void;
}>();

const HandleCreate = () => {
  modalItem.value.idMateria = props.id;
  emit('create', modalItem.value);
  modalItem.value = {} as Units;
};

const HandleCancel = () => {
  emit('close');
  modalItem.value = {} as Units;
};

const HandleVisibleChange = (visible: boolean) => {
  if (!visible) {
    modalItem.value = {} as Units;
    emit('close');
  }
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Registro" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleVisibleChange">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.nombre" placeholder="Unidad I" fluid />
    </div>
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Desarollo de actividades de Ciberseguridad" fluid />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

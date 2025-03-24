<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { ISubject } from '@/types/Subject';

const modalItem = ref<ISubject>({} as ISubject);

const props = defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', student: ISubject): void;
}>();

const HandleCreate = () => {
  emit('create', modalItem.value);
  modalItem.value = {} as ISubject;
};

const HandleCancel = () => {
  emit('close');
  modalItem.value = {} as ISubject;
};

const HandleVisibleChange = (visible: boolean) => {
  if (!visible) {
    modalItem.value = {} as ISubject;
    emit('close');
  }
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Registro" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleVisibleChange"
    >
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.nombre" placeholder="Ciencias Naturales II" fluid />
    </div>
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Esta materia es para fomentar la naturaleza" fluid />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

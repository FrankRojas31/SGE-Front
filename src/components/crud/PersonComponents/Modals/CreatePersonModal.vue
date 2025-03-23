<script setup lang="ts">
import { ref } from 'vue';
import type { IPerson } from '@/types/Persons';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';

const props = defineProps<{
  showModal: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', person: IPerson): void
}>();

const modalItem = ref<IPerson>({} as IPerson);

const HandleVisibleChange = (visible: boolean) => {
  if (!visible) {
    modalItem.value = {} as IPerson;
    emit('close');
  }
};

const HandleCreate = () => {
  emit('create', modalItem.value);
}

const HandleCancel = () => {
  modalItem.value = {} as IPerson;
  emit('close');
};

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Persona" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleVisibleChange">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.nombre" placeholder="Ej: Juan" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Paterno</label>
      <InputText v-model="modalItem.apellidoPaterno" placeholder="Ej: Pérez" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Materno</label>
      <InputText v-model="modalItem.apellidoMaterno" placeholder="Ej: Gómez" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Nacimiento</label>
      <DatePicker v-model="modalItem.fechaNacimiento" :showOnFocus="true" showIcon class="w-full" required />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

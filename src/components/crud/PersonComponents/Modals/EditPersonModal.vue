<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { IPerson } from '@/types/Persons';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';

// Props del modal
const props = defineProps<{ showModal: boolean; modalItem: IPerson | null }>();
const emit = defineEmits(['close', 'update']);

// Variable local para manejar la visibilidad del modal
const modalVisible = ref(props.showModal);

// Sincronizar `modalVisible` con `showModal`
watch(() => props.showModal, (newVal) => {
  modalVisible.value = newVal;
});

// Datos de la persona
const person = ref<IPerson>({ id: 0, esBorrado: false, nombre: '', apellidoPaterno: '', apellidoMaterno: '', fechaNacimiento: new Date() });

// Sincronizar los datos cuando `modalItem` cambia
watch(() => props.modalItem, (newData) => {
  if (newData) {
    person.value = { ...newData };
  }
});

// Cerrar modal
const closeModal = () => {
  modalVisible.value = false;
  emit('close');
};

// Guardar cambios
const handleUpdate = () => {
  if (!person.value.fechaNacimiento) {
    person.value.fechaNacimiento = new Date(); // Asigna la fecha actual si está vacía
  }
  emit('update', person.value);
  closeModal();
};
</script>

<template>
  <Dialog v-model:visible="modalVisible" header="Editar Persona" modal :style="{ width: '30rem' }" class="rounded-lg shadow-lg">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="person.nombre" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Paterno</label>
      <InputText v-model="person.apellidoPaterno" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Materno</label>
      <InputText v-model="person.apellidoMaterno" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Nacimiento</label>
      <DatePicker v-model="person.fechaNacimiento" :showOnFocus="true" showIcon class="w-full" required />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="closeModal" />
      <Button label="Guardar Cambios" severity="success" @click="handleUpdate" />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { IPerson } from '@/types/Persons';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';

// Props del modal
const props = defineProps<{ showModal: boolean }>();
const emit = defineEmits(['close', 'create']);

// Variable local para manejar la visibilidad del modal
const modalVisible = ref(props.showModal);

// Sincronizar `modalVisible` con `showModal`
watch(() => props.showModal, (newVal) => {
  modalVisible.value = newVal;
});

// Datos de la persona
const person = ref<IPerson>({ id: 0, esBorrado: false, nombre: '', apellidoPaterno: '', apellidoMaterno: '', fechaNacimiento: new Date() });

// Cerrar modal
const closeModal = () => {
  modalVisible.value = false;
  emit('close');
};

// Crear persona y cerrar modal
const handleCreate = async () => {
  console.log("Fecha antes de enviar:", person.value.fechaNacimiento);

  const response = await fetch('/api/personas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(person.value)
  });

  const result = await response.json();
  console.log("Respuesta de la API:", result);
};

</script>

<template>
  <Dialog v-model:visible="modalVisible" header="Crear Persona" modal :style="{ width: '30rem' }" class="rounded-lg shadow-lg">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="person.nombre" placeholder="Ej: Juan" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Paterno</label>
      <InputText v-model="person.apellidoPaterno" placeholder="Ej: Pérez" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Apellido Materno</label>
      <InputText v-model="person.apellidoMaterno" placeholder="Ej: Gómez" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Nacimiento</label>
      <DatePicker v-model="person.fechaNacimiento" :showOnFocus="true" showIcon class="w-full" required />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="closeModal" />
      <Button label="Crear" severity="success" @click="handleCreate" />
    </template>
  </Dialog>
</template>

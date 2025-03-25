<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { type ITeachers} from '@/types/Teachers';
import type { IPerson } from '@/types/Persons';
import { usePersonStore } from '@/stores/PersonStore';
import { ref } from 'vue';

const selectedPerson = ref<IPerson | null>(null);
const personStore = usePersonStore();

const formattedPersons = computed(() => {
  return personStore.personsList.map((person) => ({
    ...person,
    fullName: `${person.nombre} ${person.apellidoPaterno} ${person.apellidoMaterno}`,
  }));
});

const props = defineProps<{
  showModal: boolean;
  modalItem: ITeachers;
}>();

onMounted(async () => {
  // Cargar la lista de personas si está vacía
  if (personStore.personsList.length === 0) {
    await personStore.GetStorePersons(); // Asegúrate de que existe una función fetchPersons en tu store
  }
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', teacher: ITeachers): void;
}>();

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <Dialog
    v-model:visible="props.showModal"
    header="Crear Profesor"
    modal
    :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg"
    @update:visible="handleClose"
  >
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">No. de Empleado</label>
      <InputText v-model="modalItem.noEmpleado" placeholder="Ingrese el número de empleado" class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Especialidad</label>
      <InputText v-model="modalItem.especialidad" placeholder="Ingrese la especialidad" class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Grado de estudios</label>
      <InputText v-model="modalItem.gradoEstudios" placeholder="Ingrese el grado de estudios" class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Cédula Profesional</label>
      <InputText v-model="modalItem.cedulaProfesional" placeholder="Ingrese la cédula profesional" class="w-full" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Ingreso</label>
      <DatePicker
        v-model="modalItem.fechaIngreso"
        :showOnFocus="true"
        showIcon
        fluid
        class="w-full"
        placeholder="Selecciona la fecha de ingreso"
      />
    </div>

    <!-- Nuevo apartado para seleccionar persona -->
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Persona</label>
      <Select
        v-model="selectedPerson"
        :options="formattedPersons"
        optionLabel="fullName"
        placeholder="Selecciona una persona"
        class="w-full"
        filter
      />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="handleClose" />
      <Button label="Actualizar" severity="success" @click="$emit('update',props.modalItem)" />
    </template>
  </Dialog>
</template>

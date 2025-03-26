<script lang="ts" setup>
import { ref, computed } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { usePersonStore } from '@/stores/PersonStore';
import { type ITeachers } from '@/types/Teachers';
import type { IPerson } from '@/types/Persons';

const modalItem = ref<ITeachers>({} as ITeachers);
const personStore = usePersonStore();

const props = defineProps<{
  showModal: boolean;
}>();

const selectedPerson = ref<IPerson | null>(null);

const formattedPersons = computed(() => {
  return personStore.personsWithOutStudent.map((person) => ({
    ...person,
    fullName: `${person.nombre} ${person.apellidoPaterno} ${person.apellidoMaterno}`,
  }));
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', teacher: ITeachers): void;
}>();

const handleCreate = () => {
  if (selectedPerson.value) {
    modalItem.value.idPersona = selectedPerson.value.id;
  }
  emit('create', modalItem.value);
};

const handleClose = () => {
  modalItem.value = {} as ITeachers;
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Profesor" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="handleClose">
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
      <DatePicker v-model="modalItem.fechaIngreso" :showOnFocus="true" showIcon fluid class="w-full"
        placeholder="Selecciona la fecha de ingreso" />
    </div>


    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Persona</label>
      <Select v-model="selectedPerson" :options="formattedPersons" optionLabel="fullName"
        placeholder="Selecciona una persona" class="w-full" filter />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="handleClose" />
      <Button label="Crear" severity="success" @click="handleCreate" />
    </template>
  </Dialog>
</template>

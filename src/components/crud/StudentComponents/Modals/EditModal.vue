<script lang="ts" setup>
import type { IStudent } from '@/types/Students';
import { ref, computed, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { usePersonStore } from '@/stores/PersonStore';
import { useSchoolYearStore } from '../../../../stores/SchoolYearStore';
import type { IPerson } from '@/types/Persons';
import type { ISchoolYear } from '@/types/SchoolYear';

const personStore = usePersonStore();
const schoolYearStore = useSchoolYearStore();

const props = defineProps<{
  showModal: boolean;
  modalItem: IStudent;
}>();

const selectedPerson = ref<IPerson | null>(null);
const selectedSchoolYear = ref<ISchoolYear | null>(null);

const formattedPersons = computed(() => {
  return personStore.personsList.map((person) => ({
    ...person,
    fullName: `${person.nombre} ${person.apellidoPaterno} ${person.apellidoMaterno}`,
  }));
});

const formattedSchoolYears = computed(() => {
  return schoolYearStore.schoolYearsList;
});


watch(() => props.showModal, (newVal) => {
  if (newVal) {
    selectedPerson.value = formattedPersons.value.find(x => x.id === props.modalItem.idPersona) || null;
    selectedSchoolYear.value = formattedSchoolYears.value.find(x => x.id === props.modalItem.idCursoEscolar) || null;
  }
}, { immediate: true });

defineEmits<{
  (e: 'close'): void;
  (e: 'update', student: IStudent): void;
}>();
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Registro" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Matrícula</label>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-address-book"></i>
        </InputGroupAddon>
        <InputNumber v-model="props.modalItem.matricula" :useGrouping="false" />
      </InputGroup>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Número de Emergencia</label>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-phone"></i>
        </InputGroupAddon>
        <InputText v-model="props.modalItem.contactoEmergencia" placeholder="Ej: 555-123-4567" fluid />
      </InputGroup>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Necesidades Especiales</label>
      <InputText v-model="props.modalItem.necesidadesEspeciales" placeholder="Describa necesidades especiales" fluid />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Ingreso</label>
      <DatePicker v-model="props.modalItem.fechaIngreso" :showOnFocus="true" showIcon fluid />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Estado de Usuario</label>
      <div class="flex items-center mt-2">
        <Checkbox v-model="props.modalItem.estado" inputId="estado" :binary="true" />
        <label for="estado" class="ml-2 text-gray-600">BAJA</label>
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Curso Escolar</label>
      <Select v-model="selectedSchoolYear" :options="formattedSchoolYears" optionLabel="nombre"
        placeholder="Selecciona un curso escolar" class="w-full" filter />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Persona</label>
      <Select v-model="selectedPerson" :options="formattedPersons" optionLabel="fullName"
        placeholder="Selecciona una persona" class="w-full" filter />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="$emit('close')" />
      <Button label="Guardar" severity="success" @click="$emit('update', props.modalItem)" />
    </template>
  </Dialog>
</template>

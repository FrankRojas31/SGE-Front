<script lang="ts" setup>
import type { IStudent } from '@/types/Students';
import { ref, computed } from 'vue';
import Dialog from 'primevue/dialog';
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

const modalItem = ref<IStudent>({} as IStudent)
const personStore = usePersonStore();
const schoolYearStore = useSchoolYearStore()

const props = defineProps<{
  showModal: boolean;
}>();

const selectedPerson = ref<IPerson | null>(null);
const selectedSchoolYear = ref<ISchoolYear | null>(null);

const formattedPersons = computed(() => {
  return personStore.personsWithOutStudent.map((person) => ({
    ...person,
    fullName: `${person.nombre} ${person.apellidoPaterno} ${person.apellidoMaterno}`,
  }));
});

const formattedSchoolYears = computed(() => {
  return schoolYearStore.schoolYearsList;
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', student: IStudent): void
}>();

const HandleCreate = () => {
  if (selectedPerson.value) {
    modalItem.value.idPersona = selectedPerson.value.id;
  }
  if (selectedSchoolYear.value) {
    modalItem.value.idCursoEscolar = selectedSchoolYear.value.id;
  }
  emit('create', modalItem.value);
  modalItem.value = {} as IStudent;
  selectedPerson.value = {} as IPerson;
  selectedSchoolYear.value = {} as ISchoolYear;
};

const HandleClose = () => {
  emit('close')
  modalItem.value = {} as IStudent;
  selectedPerson.value = {} as IPerson;
  selectedSchoolYear.value = {} as ISchoolYear;
}

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Registro" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleClose">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Matrícula</label>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-address-book"></i>
        </InputGroupAddon>
        <InputNumber placeholder="22393186" v-model="modalItem.matricula" :useGrouping="false" />
      </InputGroup>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Número de Emergencia</label>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-phone"></i>
        </InputGroupAddon>
        <InputText v-model="modalItem.contactoEmergencia" placeholder="Ej: 555-123-4567" fluid />
      </InputGroup>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Necesidades Especiales</label>
      <InputText v-model="modalItem.necesidadesEspeciales" placeholder="Describa necesidades especiales" fluid />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Ingreso</label>
      <DatePicker v-model="modalItem.fechaIngreso" placeholder="Selecciona una Fecha de Ingreso" :showOnFocus="true"
        showIcon fluid />
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
      <Button label="Cancelar" severity="secondary" @click="HandleClose" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>

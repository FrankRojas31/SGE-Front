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
const errors = ref<Record<string, string>>({});

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

const validateFields = () => {
  errors.value = {};
  let isValid = true;

  if (!modalItem.value.matricula) {
    errors.value.matricula = 'La matrícula es requerida';
    isValid = false;
  }
  if (!modalItem.value.contactoEmergencia?.trim()) {
    errors.value.contactoEmergencia = 'El número de emergencia es requerido';
    isValid = false;
  }
  if (!modalItem.value.fechaIngreso) {
    errors.value.fechaIngreso = 'La fecha de ingreso es requerida';
    isValid = false;
  }
  if (!selectedSchoolYear.value) {
    errors.value.cursoEscolar = 'Debe seleccionar un curso escolar';
    isValid = false;
  }
  if (!selectedPerson.value) {
    errors.value.persona = 'Debe seleccionar una persona';
    isValid = false;
  }

  return isValid;
};

const HandleCreate = () => {
  if (validateFields()) {
    if (selectedPerson.value) {
      modalItem.value.idPersona = selectedPerson.value.id;
    }
    if (selectedSchoolYear.value) {
      modalItem.value.idCursoEscolar = selectedSchoolYear.value.id;
    }
    emit('create', modalItem.value);
    modalItem.value = {} as IStudent;
    selectedPerson.value = null;
    selectedSchoolYear.value = null;
    errors.value = {};
  }
};

const HandleClose = () => {
  emit('close')
  modalItem.value = {} as IStudent;
  selectedPerson.value = null;
  selectedSchoolYear.value = null;
  errors.value = {};
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
        <InputNumber 
          placeholder="22393186" 
          v-model="modalItem.matricula" 
          :useGrouping="false"
          :class="{ 'p-invalid': errors.matricula }" 
        />
      </InputGroup>
      <small v-if="errors.matricula" class="text-red-500 text-sm mt-1">{{ errors.matricula }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Número de Emergencia</label>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-phone"></i>
        </InputGroupAddon>
        <InputText 
          v-model="modalItem.contactoEmergencia" 
          placeholder="Ej: 555-123-4567"
          :class="{ 'p-invalid': errors.contactoEmergencia }" 
        />
      </InputGroup>
      <small v-if="errors.contactoEmergencia" class="text-red-500 text-sm mt-1">{{ errors.contactoEmergencia }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Necesidades Especiales</label>
      <InputText 
        v-model="modalItem.necesidadesEspeciales" 
        placeholder="Describa necesidades especiales" 
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Ingreso</label>
      <DatePicker 
        v-model="modalItem.fechaIngreso" 
        placeholder="Selecciona una Fecha de Ingreso" 
        :showOnFocus="true"
        showIcon
        :class="{ 'p-invalid': errors.fechaIngreso }"
      />
      <small v-if="errors.fechaIngreso" class="text-red-500 text-sm mt-1">{{ errors.fechaIngreso }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Curso Escolar</label>
      <Select 
        v-model="selectedSchoolYear" 
        :options="formattedSchoolYears" 
        optionLabel="nombre"
        placeholder="Selecciona un curso escolar" 
        class="w-full" 
        filter
        :class="{ 'p-invalid': errors.cursoEscolar }"
      />
      <small v-if="errors.cursoEscolar" class="text-red-500 text-sm mt-1">{{ errors.cursoEscolar }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Persona</label>
      <Select 
        v-model="selectedPerson" 
        :options="formattedPersons" 
        optionLabel="fullName"
        placeholder="Selecciona una persona" 
        class="w-full" 
        filter
        :class="{ 'p-invalid': errors.persona }"
      />
      <small v-if="errors.persona" class="text-red-500 text-sm mt-1">{{ errors.persona }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleClose" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>
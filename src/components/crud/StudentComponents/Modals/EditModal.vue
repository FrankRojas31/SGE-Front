<script lang="ts" setup>
import type { IStudent } from '@/types/Students';
import { ref, computed, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { useSchoolYearStore } from '@/stores/SchoolYearStore';
import type { ISchoolYear } from '@/types/SchoolYear';

const props = defineProps<{
  showModal: boolean;
  modalItem: IStudent;
}>();

const schoolYearStore = useSchoolYearStore();
const selectedSchoolYear = ref<ISchoolYear | null>(null);
const dateIncome = ref(new Date(props.modalItem.fechaIngreso));
const errors = ref<Record<string, string>>({});

const formattedSchoolYears = computed(() => {
  return schoolYearStore.schoolYearsList;
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', student: IStudent): void;
}>();

watch(() => props.showModal, (newVal) => {
  if (newVal) {
    selectedSchoolYear.value = formattedSchoolYears.value.find(x => x.id === props.modalItem.idCursoEscolar) || null;
    errors.value = {};
  }
}, { immediate: true });

watch(() => props.modalItem.fechaIngreso, (newDate) => {
  dateIncome.value = new Date(newDate);
});

const validateFields = () => {
  errors.value = {};
  let isValid = true;

  if (!props.modalItem.matricula) {
    errors.value.matricula = 'La matrícula es requerida';
    isValid = false;
  }
  if (!props.modalItem.contactoEmergencia?.trim()) {
    errors.value.contactoEmergencia = 'El número de emergencia es requerido';
    isValid = false;
  }
  if (!dateIncome.value) {
    errors.value.fechaIngreso = 'La fecha de ingreso es requerida';
    isValid = false;
  }
  if (!selectedSchoolYear.value) {
    errors.value.cursoEscolar = 'Debe seleccionar un curso escolar';
    isValid = false;
  }

  return isValid;
};

const HandleEdit = () => {
  if (validateFields()) {
    props.modalItem.fechaIngreso = dateIncome.value;
    if (selectedSchoolYear.value) {
      props.modalItem.idCursoEscolar = selectedSchoolYear.value.id;
    }
    emit('update', props.modalItem);
  }
};

const HandleCancel = () => {
  errors.value = {};
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Registro" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Persona</label>
      <InputText v-model="props.modalItem.nombreCompleto" disabled fluid />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Matrícula</label>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-address-book"></i>
        </InputGroupAddon>
        <InputNumber 
          v-model="props.modalItem.matricula" 
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
          v-model="props.modalItem.contactoEmergencia" 
          placeholder="Ej: 555-123-4567"
          :class="{ 'p-invalid': errors.contactoEmergencia }"
        />
      </InputGroup>
      <small v-if="errors.contactoEmergencia" class="text-red-500 text-sm mt-1">{{ errors.contactoEmergencia }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Necesidades Especiales</label>
      <InputText v-model="props.modalItem.necesidadesEspeciales" placeholder="Describa necesidades especiales" fluid />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Fecha de Ingreso</label>
      <DatePicker 
        v-model="dateIncome" 
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

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Guardar" severity="success" @click="HandleEdit" />
    </template>
  </Dialog>
</template>
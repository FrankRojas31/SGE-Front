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
  }
}, { immediate: true });

watch(() => props.modalItem.fechaIngreso, (newDate) => {
  dateIncome.value = new Date(newDate);
});

const HandleEdit = () => {
  props.modalItem.fechaIngreso = dateIncome.value;
  emit('update', props.modalItem);
}

const HandleCancel = () => {
  emit('close');
}

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
      <DatePicker v-model="dateIncome" :showOnFocus="true" showIcon fluid />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Curso Escolar</label>
      <Select v-model="selectedSchoolYear" :options="formattedSchoolYears" optionLabel="nombre"
        placeholder="Selecciona un curso escolar" class="w-full" filter />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Guardar" severity="success" @click="HandleEdit" />
    </template>

  </Dialog>
</template>

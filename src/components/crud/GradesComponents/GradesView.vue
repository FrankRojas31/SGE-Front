<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useGradesStore } from '@/stores/GradesStore';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { columns } from '@/components/crud/GradesComponents/TableColumns';
import { GetGrades } from '@/utils/helpers';
import type { Grades } from '@/types/Grades';
import DeleteModal from '@/components/crud/DeleteModal.vue';
import CreateModal from './Modals/CreateModalGrades.vue';
import EditModalGrades from '@/components/crud/GradesComponents/Modals/EditModalGrades.vue';

const toast = useToast();
const loading = ref<boolean>(false);
const gradesStore = useGradesStore();
const openModalCreate = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const openModalDelete = ref<boolean>(false);
const modalItem = ref<Grades>({} as Grades);
const idItem = ref<number>(0);

const HandleEdit = async (id: number) => {
  const response = await gradesStore.GetStoreGrade(id);
  if (response?.success) {
    openModalEdit.value = true;
    modalItem.value = gradesStore.grade;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró la calificación', detail: 'Verifica su existencia', life: 2000 });
  }
};

const EditConfirm = async (grade: Grades) => {
  const response = await gradesStore.PutStoreGrade(grade);
  if (response?.success) {
    openModalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se ha actualizado la calificación!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const CreateConfirm = async (grade: Grades) => {
  const response = await gradesStore.PostStoreGrade(grade);
  if (response?.success) {
    openModalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha agregado la calificación!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const HandleDelete = async (id: number) => {
  const response = await gradesStore.GetStoreGrade(id);
  if (response?.success) {
    openModalDelete.value = true;
    idItem.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró la calificación', detail: 'Verifica su existencia', life: 2000 });
  }
};

const DeleteConfirm = async (id: number) => {
  const response = await gradesStore.DeleteStoreGrade(id);
  if (response?.success) {
    openModalDelete.value = false;
    toast.add({ severity: 'success', summary: '¡Eliminado Correctamente!', detail: '¡Se ha eliminado la calificación!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await GetGrades();
    if (res?.success) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <AppLayout>
    <Toast />
    <GeneralTable :loading="loading" title="Calificaciones" :data="gradesStore.gradesList" :columns="columns" @edit="HandleEdit"
      @delete="HandleDelete" @create="openModalCreate = true">
    </GeneralTable>

    <CreateModal :showModal="openModalCreate" @close="openModalCreate = false" @create="CreateConfirm" />
    <EditModalGrades :modalItem="modalItem" :showModal="openModalEdit" @close="openModalEdit = false"
      @update="EditConfirm" />
    <DeleteModal :showModal="openModalDelete" :id="idItem" @close="openModalDelete = false" @delete="DeleteConfirm" />
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import type { ISubject } from '@/types/Subject';
import AppLayout from '@/layout/AppLayout.vue';
import { columnsSubject } from './TableColumns';
import { useSubjectStore } from '@/stores/SubjectStore';
import { GetSubjects } from '@/utils/helpers';
import CreateModal from './Modals/CreateModal.vue';
import { Toast, useToast } from 'primevue';
import DeleteModal from '../DeleteModal.vue';
import EditModal from './Modals/EditModal.vue';

const toast = useToast();
const loading = ref<boolean>(false);
const subjectStore = useSubjectStore();
const openModalCreate = ref<boolean>(false)
const openModalEdit = ref<boolean>(false)
const openModalDelete = ref<boolean>(false)
const modalItem = ref<ISubject>({} as ISubject);
const idItem = ref<number>(0);

const CreateConfirm = async (subject: ISubject) => {
  const response = await subjectStore.PostStoreSubject(subject);
  if (response?.success) {
    openModalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha creado a la Materia!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

const HandleEdit = async (id: number) => {
  const response = await subjectStore.GetStoreSubject(id);
  if (response?.success) {
    openModalEdit.value = true;
    modalItem.value = subjectStore.subject;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontro al Materia', detail: 'Verifica su existencia', life: 2000 });
  }
}

const EditConfirm = async (subject: ISubject) => {
  const response = await subjectStore.PutStoreSubject(subject);
  if (response?.success) {
    openModalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se actualizado a la materia!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

const HandleDelete = async (id: number) => {
  const response = await subjectStore.GetStoreSubject(id);
  if (response?.success) {
    openModalDelete.value = true;
    idItem.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontro al Materia', detail: 'Verifica su existencia', life: 2000 });
  }
}

const DeleteConfirm = async (id: number) => {
  const response = await subjectStore.DeleteStoreSubject(id);
  if (response?.success) {
    openModalDelete.value = false;
    toast.add({ severity: 'success', summary: 'Eliminado Correctamente!', detail: '¡Se ha Eliminado a la Materia!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

onMounted(async () => {
  loading.value = true;
  try {
    const res = await GetSubjects();
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
    <GeneralTable :loading="loading" :title="'Materias'" :data="subjectStore.subjectsList" :columns="columnsSubject"
      @edit="HandleEdit" @delete="HandleDelete" @create="openModalCreate = true" />

    <CreateModal :showModal="openModalCreate" @close="openModalCreate = false" @create="CreateConfirm"
      @update:visible="openModalCreate = false" />
    <EditModal :showModal="openModalEdit" :modalItem="modalItem" @close="openModalEdit = false"
      @update:visible="openModalEdit = false" @update="EditConfirm" />
    <DeleteModal :showModal="openModalDelete" @delete="DeleteConfirm" :id="idItem"
      @update:visible="openModalDelete = false" />
  </AppLayout>
</template>

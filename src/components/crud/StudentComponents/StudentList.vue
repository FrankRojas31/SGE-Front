<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useStudentStore } from '@/stores/StudentStore';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { columns } from './TableColumns';
import { GetPersons, GetSchoolYear, GetStudents } from '@/utils/helpers';
import CreateModal from './Modals/CreateModal.vue';
import EditModal from './Modals/EditModal.vue';
import type { IStudent } from '@/types/Students';
import DeleteModal from '@/components/crud/DeleteModal.vue'
import { Button } from 'primevue';
import { usePersonStore } from '@/stores/PersonStore';
import { GetPersonsWithOutStudent } from '@/utils/helpers';

const toast = useToast();
const loading = ref<boolean>(false);
const studentsStore = useStudentStore();
const personStore = usePersonStore();
const openModalCreate = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const openModalDelete = ref<boolean>(false);
const modalItem = ref<IStudent>({} as IStudent);
const idItem = ref<number>(0);

const HandleEdit = async (id: number) => {
  const response = await studentsStore.GetStoreStudent(id);
  if (response?.success) {
    const res = await personStore.GetStorePerson(studentsStore.student.idPersona);
    if (res?.success) {
      openModalEdit.value = true;
      modalItem.value = response.data;
      modalItem.value.nombreCompleto = studentsStore.student.nombreCompleto;
    }
  } else {
    toast.add({ severity: 'error', summary: 'No se encontro al alumno', detail: 'Verifica su existencia', life: 2000 });
  }
}

const EditConfirm = async (student: IStudent) => {
  const response = await studentsStore.PutStoreStudent(student);
  if (response?.success) {
    openModalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se actualizado al alumno!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

const CreateConfirm = async (student: IStudent) => {
  const response = await studentsStore.PostStoreStudent(student);
  if (response?.success) {
    openModalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha creado al alumno!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

const HandleDelete = async (id: number) => {
  const response = await studentsStore.GetStoreStudent(id);
  if (response?.success) {
    openModalDelete.value = true;
    idItem.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontro al alumno', detail: 'Verifica su existencia', life: 2000 });
  }
}

const DeleteConfirm = async (id: number) => {
  const response = await studentsStore.DeleteStoreStudent(id);
  if (response?.success) {
    openModalDelete.value = false;
    toast.add({ severity: 'success', summary: 'Eliminado Correctamente!', detail: '¡Se ha Eliminado al alumno!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

const FormatDate = () => {
  return studentsStore.studentsList.map((students) => {
    return {
      ...students,
      fechaIngreso: new Date(students.fechaIngreso).toLocaleDateString()
    }
  })
}

onMounted(async () => {
  loading.value = true;
  try {
    const res = await GetStudents();
    const res1 = await GetPersonsWithOutStudent();
    if (res?.success) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    await Promise.all([GetPersons(), GetSchoolYear(), GetPersonsWithOutStudent()]);
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
    <GeneralTable :loading="loading" :title="'Estudiantes'" :data="FormatDate()" :columns="columns" @edit="HandleEdit"
      @delete="HandleDelete" @create="openModalCreate = true">
      <Button class="mr-2" severity="secondary" icon="pi pi-users" rounded />
    </GeneralTable>

    <CreateModal :showModal="openModalCreate" @close="openModalCreate = false" @create="CreateConfirm" />
    <EditModal :modalItem="modalItem" :showModal="openModalEdit" @close="openModalEdit = false" @update="EditConfirm" />
    <DeleteModal :showModal="openModalDelete" :id="idItem" @close="openModalDelete = false" @delete="DeleteConfirm" />
  </AppLayout>
</template>

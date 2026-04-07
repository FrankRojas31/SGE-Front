<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useCoursesStore } from '@/stores/CoursesStore';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { columns } from '@/components/crud/CoursesComponents/TableColumns';
import { GetCourses } from '@/utils/helpers';
import type { Courses } from '@/types/Courses';
import DeleteModal from '@/components/crud/DeleteModal.vue';
import CreateModal from './Modals/CreateModalCourses.vue';
import EditModalCourses from '@/components/crud/CoursesComponents/Modals/EditModalCourses.vue';

const toast = useToast();
const loading = ref<boolean>(false);
const courseStore = useCoursesStore();
const openModalCreate = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const openModalDelete = ref<boolean>(false);
const modalItem = ref<Courses>({} as Courses);
const idItem = ref<number>(0);

const HandleEdit = async (id: number) => {
  const response = await courseStore.GetStoreCourse(id);
  if (response?.success) {
    openModalEdit.value = true;
    modalItem.value = courseStore.course;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el curso', detail: 'Verifica su existencia', life: 2000 });
  }
};

const EditConfirm = async (course: Courses) => {
  const response = await courseStore.PutStoreCourse(course);
  if (response?.success) {
    openModalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se ha actualizado el curso!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const CreateConfirm = async (course: Courses) => {
  const response = await courseStore.PostStoreCourse(course);
  if (response?.success) {
    openModalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha creado el curso!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const HandleDelete = async (id: number) => {
  const response = await courseStore.GetStoreCourse(id);
  if (response?.success) {
    openModalDelete.value = true;
    idItem.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el curso', detail: 'Verifica su existencia', life: 2000 });
  }
};

const DeleteConfirm = async (id: number) => {
  const response = await courseStore.DeleteStoreCourse(id);
  if (response?.success) {
    openModalDelete.value = false;
    toast.add({ severity: 'success', summary: '¡Eliminado Correctamente!', detail: '¡Se ha eliminado el curso!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await GetCourses();
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
    <GeneralTable :loading="loading" title="Cursos" :data="courseStore.coursesList" :columns="columns" @edit="HandleEdit"
      @delete="HandleDelete" @create="openModalCreate = true">
    </GeneralTable>

    <CreateModal :showModal="openModalCreate" @close="openModalCreate = false" @create="CreateConfirm" />
    <EditModalCourses :modalItem="modalItem" :showModal="openModalEdit" @close="openModalEdit = false"
      @update="EditConfirm" />
    <DeleteModal :showModal="openModalDelete" :id="idItem" @close="openModalDelete = false" @delete="DeleteConfirm" />
  </AppLayout>
</template>

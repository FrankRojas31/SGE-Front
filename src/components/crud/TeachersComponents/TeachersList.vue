<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useTeachersStore } from '@/stores/TeachersStore.ts';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { columns } from '@/components/crud/TeachersComponents/TableColumns';
import { GetTeachers } from '@/utils/helpers';
import type { ITeachers } from '@/types/Teachers';
import DeleteModal from '@/components/crud/DeleteModal.vue';
import EditModalTeachers from '@/components/crud/TeachersComponents/Modals/EditModalTeachers.vue';
import { Button } from 'primevue';
import { useRouter } from 'vue-router';
import CreateModal from '@/components/crud/TeachersComponents/Modals/CreateModalTeachers.vue';


const toast = useToast();
const loading = ref<boolean>(false);
const teacherStore = useTeachersStore();
const openModalCreate = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const openModalDelete = ref<boolean>(false);
const modalItem = ref<ITeachers>({} as ITeachers);
const idItem = ref<number>(0);

const HandleEdit = async (id: number) => {
  const response = await teacherStore.GetStoreTeacher(id);
  if (response?.success) {
    openModalEdit.value = true;
    modalItem.value = teacherStore.teacher;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el profesor', detail: 'Verifica su existencia', life: 2000 });
  }
};

const EditConfirm = async (teacher: ITeachers) => {
  const response = await teacherStore.PutStoreTeacher(teacher);
  if (response?.success) {
    openModalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se ha actualizado el profesor!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const CreateConfirm = async (teacher: ITeachers) => {
  const response = await teacherStore.PostStoreTeacher(teacher);
  if (response?.success) {
    openModalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha creado el profesor!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const HandleDelete = async (id: number) => {
  const response = await teacherStore.GetStoreTeacher(id);
  if (response?.success) {
    openModalDelete.value = true;
    idItem.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el profesor', detail: 'Verifica su existencia', life: 2000 });
  }
};

const DeleteConfirm = async (id: number) => {
  const response = await teacherStore.DeleteStoreTeacher(id);
  if (response?.success) {
    openModalDelete.value = false;
    toast.add({ severity: 'success', summary: '¡Eliminado Correctamente!', detail: '¡Se ha eliminado el profesor!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await GetTeachers();
    if (res?.success) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  } finally {
    loading.value = false;
  }
});

const router = useRouter();

const HandleButton = (id: number) => {
  console.log(id);
  router.push(`teacherssubjects/${id}`);
}
</script>

<template>
  <AppLayout>
    <Toast />
    <GeneralTable :loading="loading" title="Profesores" :data="teacherStore.teachersList" :columns="columns" @edit="HandleEdit"
      @delete="HandleDelete" @create="openModalCreate = true">
      <template #customButton="{ data }">
        <Button icon="pi pi-users" rounded class="mr-2" @click="HandleButton(data.id)" />
      </template>
    </GeneralTable>


    <CreateModal :showModal="openModalCreate" @close="openModalCreate = false" @create="CreateConfirm" />

    <EditModalTeachers :modalItem="modalItem" :showModal="openModalEdit" @close="openModalEdit = false"
      @update="EditConfirm" />

    <DeleteModal :showModal="openModalDelete" :id="idItem" @close="openModalDelete = false" @delete="DeleteConfirm" />
  </AppLayout>
</template>

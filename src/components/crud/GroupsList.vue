<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useGroupsStore } from '@/stores/GroupsStore';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { columns } from '@/components/crud/GroupsComponents/TableColumnsGroups';
import { GetGroups } from '@/utils/helpers';
import type { Groups } from '@/types/Groups';
import DeleteModal from '@/components/crud/DeleteModal.vue';
import CreateModal from './GroupsComponents/CreateModalGroups.vue';
import EditModalGroups from '@/components/crud/GroupsComponents/EditModalGroups.vue';

const toast = useToast();
const loading = ref<boolean>(false);
const groupStore = useGroupsStore();
const openModalCreate = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const openModalDelete = ref<boolean>(false);
const modalItem = ref<Groups>({} as Groups);
const idItem = ref<number>(0);

// Acción para editar un grupo
const HandleEdit = async (id: number) => {
  const response = await groupStore.GetStoreGroup(id);
  if (response?.success) {
    openModalEdit.value = true;
    modalItem.value = groupStore.group;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el grupo', detail: 'Verifica su existencia', life: 2000 });
  }
};



// Confirmación de edición
const EditConfirm = async (group: Groups) => {
  const response = await groupStore.PutStoreGroup(group);
  if (response?.success) {
    openModalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se ha actualizado el grupo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

// Confirmación de creación
const CreateConfirm = async (group: Groups) => {
  const response = await groupStore.PostStoreGroup(group);
  if (response?.success) {
    openModalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha creado el grupo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};




// Acción para eliminar un grupo
const HandleDelete = async (id: number) => {
  const response = await groupStore.GetStoreGroup(id);
  if (response?.success) {
    openModalDelete.value = true;
    idItem.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el grupo', detail: 'Verifica su existencia', life: 2000 });
  }
};

// Confirmación de eliminación
const DeleteConfirm = async (id: number) => {
  const response = await groupStore.DeleteStoreGroup(id);
  if (response?.success) {
    openModalDelete.value = false;
    toast.add({ severity: 'success', summary: '¡Eliminado Correctamente!', detail: '¡Se ha eliminado el grupo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};


// Cargar los grupos al montar el componente
onMounted(async () => {
  loading.value = true;
  try {
    const res = await GetGroups();
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
    <GeneralTable
      :loading="loading"
      title="Grupos"
      :data="groupStore.groupsList"
      :columns="columns"
      @edit="HandleEdit"
      @delete="HandleDelete"
      @create="openModalCreate = true"
    />

    <CreateModal
      :showModal="openModalCreate"
      @close="openModalCreate = false"
      @create="CreateConfirm"
    />

    <EditModalGroups :modalItem="modalItem" :showModal="openModalEdit" @close="openModalEdit = false" @update="EditConfirm" />

    <DeleteModal
      :showModal="openModalDelete"
      :id="idItem"
      @close="openModalDelete = false"
      @delete="DeleteConfirm"
    />
  </AppLayout>
</template>

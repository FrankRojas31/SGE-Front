<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useGroupsStore } from '@/stores/GroupsStore';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { columns } from '@/components/crud/GroupsComponents/TableColumns';
import type { Groups } from '@/types/Groups';
import DeleteModal from '@/components/crud/DeleteModal.vue';
import CreateModal from './Modals/CreateModalGroups.vue';
import EditModalGroups from '@/components/crud/GroupsComponents/Modals/EditModalGroups.vue';
import { Button } from 'primevue';
import { useRouter } from 'vue-router';
import { GetPeriodActive } from '@/api/services/PeriodsServices';
import type { IPeriods } from '@/types/Periods';

const toast = useToast();
const loading = ref<boolean>(false);
const groupStore = useGroupsStore();
const openModalCreate = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const openModalDelete = ref<boolean>(false);
const modalItem = ref<Groups>({} as Groups);
const idItem = ref<number>(0);
const periodActive = ref<IPeriods | string>({} as IPeriods);
const periodNoActive = ref<boolean>(true);

const HandleEdit = async (id: number) => {
  const response = await groupStore.GetStoreGroup(id);
  if (response?.success) {
    openModalEdit.value = true;
    modalItem.value = groupStore.group;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el grupo', detail: 'Verifica su existencia', life: 2000 });
  }
};

const EditConfirm = async (group: Groups) => {
  const response = await groupStore.PutStoreGroup(group);
  if (response?.success) {
    openModalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se ha actualizado el grupo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const CreateConfirm = async (group: Groups) => {
  const response = await groupStore.PostStoreGroup(group);
  if (response?.success) {
    openModalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha creado el grupo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const HandleDelete = async (id: number) => {
  const response = await groupStore.GetStoreGroup(id);
  if (response?.success) {
    openModalDelete.value = true;
    idItem.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el grupo', detail: 'Verifica su existencia', life: 2000 });
  }
};

const DeleteConfirm = async (id: number) => {
  const response = await groupStore.DeleteStoreGroup(id);
  if (response?.success) {
    openModalDelete.value = false;
    toast.add({ severity: 'success', summary: '¡Eliminado Correctamente!', detail: '¡Se ha eliminado el grupo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await groupStore.GetStoreGroups();
    await HandlePeriodActive();
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

const HandleButtonStudents = (id: number) => {
  router.push(`/groupStudents/${id}`)
}

const HandleButtonSubject = (id: number) => {
  router.push(`/groupSubjects/${id}`)
}

const HandleButtonCalifications = (id: number) => {
  router.push(`/groupCalifications/${id}`)
}

const HandlePeriodActive = async () => {
  const response = await GetPeriodActive();
  if (response?.success) {
    if(response.data != null) {
      periodNoActive.value = false;
      periodActive.value = response.data;
    } else {
      periodNoActive.value = true;
    }
  }
}

</script>

<template>
  <AppLayout>
    <Toast />
    <GeneralTable :loading="loading" title="Grupos" :data="groupStore.groupsList" :columns="columns" @edit="HandleEdit"
      @delete="HandleDelete" @create="openModalCreate = true" :disabled-create="false" >
      <template #customButton="{ data }">
        <Button v-tooltip="'Agregar Materias'" icon="pi pi-book" severity="warn" variant="outlined" rounded raised
          class="mr-2" @click="HandleButtonSubject(data.id)" />
        <Button v-tooltip="'Agregar Alumnos'" icon="pi pi-users" severity="success" variant="outlined" raised rounded
          class="mr-2" @click="HandleButtonStudents(data.id)" />
          <Button v-tooltip="'Agregar Calificaciones'" icon="pi pi-users" severity="success" variant="outlined" raised rounded
          class="mr-2" @click="HandleButtonCalifications(data.id)" />
      </template>
    </GeneralTable>

    <CreateModal :showModal="openModalCreate" @close="openModalCreate = false" @create="CreateConfirm" />
    <EditModalGroups :modalItem="modalItem" :showModal="openModalEdit" @close="openModalEdit = false"
      @update="EditConfirm" />
    <DeleteModal :showModal="openModalDelete" :id="idItem" @close="openModalDelete = false" @delete="DeleteConfirm" />
  </AppLayout>
</template>

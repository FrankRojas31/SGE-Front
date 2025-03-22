<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import { usePeriodsStore } from '@/stores/PeriodsStore';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { columns } from './TableColumns';
import { GetPeriods } from '@/utils/helpers';
import CreateModal from '@/components/crud/PeriodsComponents/Modals/CreateModal.vue';
import DeleteModal from '@/components/crud/DeleteModal.vue';
import EditModal from '@/components/crud/PeriodsComponents/Modals/EditModal.vue';
import { estatusPeriodo, type IPeriods } from '@/types/Periods';
import AppLayout from '@/layout/AppLayout.vue';

const toast = useToast();
const loading = ref<boolean>(false);
const periodsStore = usePeriodsStore();
const openModalCreate = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const openModalDelete = ref<boolean>(false);
const modalItem = ref<IPeriods>({} as IPeriods);
const idItem = ref<number>(0);

const CreateConfirm = async (periods: IPeriods) => {
  const response = await periodsStore.PostStorePeriod(periods);
  if (response?.success) {
    openModalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha creado el periodo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

const HandleDelete = async (id: number) => {
  const response = await periodsStore.GetStorePeriod(id);
  if (response?.success) {
    openModalDelete.value = true;
    idItem.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontro al periodo', detail: 'Verifica su existencia', life: 2000 });
  }
}

const HandleEdit = async (id: number) => {
  const response = await periodsStore.GetStorePeriod(id);
  if (response?.success) {
    openModalEdit.value = true;
    modalItem.value = response.data;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontro el periodo', detail: 'Verifica su existencia', life: 2000 });
  }
}

const EditConfirm = async (period: IPeriods) => {
  const response = await periodsStore.PutStorePeriod(period);
  if (response?.success) {
    openModalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se actualizado el periodo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

const DeleteConfirm = async (id: number) => {
  const response = await periodsStore.DeleteStorePeriod(id);
  if (response?.success) {
    openModalDelete.value = false;
    toast.add({ severity: 'success', summary: 'Eliminado Correctamente!', detail: '¡Se ha Eliminado el periodo!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrio un error!', detail: response?.message, life: 2000 });
  }
}

onMounted(async () => {
  loading.value = true;
  try {
    const res = await GetPeriods();
    if (res?.success) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("Error al cargar los períodos:", error);
  } finally {
    loading.value = false;
  }
});

const FormatDate = () => {
  return periodsStore.periodsList.map((period) => {
    return {
      ...period,
      estatusPeriodo: estatusPeriodo[period.estatusPeriodo],
      fechaInicio: new Date(period.fechaInicio).toLocaleDateString(),
      fechaFin: new Date(period.fechaFin).toLocaleDateString()
    }
  })
}

</script>

<template>
  <AppLayout>
    <Toast />
    <GeneralTable :title="'Periodos'" :columns="columns" :data="FormatDate()" :loading="loading" @edit="HandleEdit"
      @delete="HandleDelete" @create="openModalCreate = true" />
    <CreateModal :showModal="openModalCreate" @close="openModalCreate = false" @create="CreateConfirm" />
    <DeleteModal :showModal="openModalDelete" :id="idItem" @close="openModalDelete = false" @delete="DeleteConfirm" />
    <EditModal :modalItem="modalItem" :showModal="openModalEdit" @close="openModalEdit = false" @update="EditConfirm" />

  </AppLayout>
</template>

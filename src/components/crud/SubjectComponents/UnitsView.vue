<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useUnitsStore } from '@/stores/UnitStore';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { columnsUnits } from '@/components/crud/SubjectComponents/TableUnits';
import { GetUnits } from '@/utils/helpers';
import type { Units } from '@/types/Unit';
import DeleteModal from '@/components/crud/DeleteModal.vue';
import CreateModal from './ModalsUnit/CreateModalUnit.vue';
import EditModalUnit from './ModalsUnit/EditModalUnit.vue';
import { useRoute } from 'vue-router';

const toast = useToast();
const loading = ref<boolean>(false);
const UnitStore = useUnitsStore();
const modalCreate = ref<boolean>(false);
const modalEdit = ref<boolean>(false);
const modalDelete = ref<boolean>(false);
const selectedUnit = ref<Units>({} as Units);
const selectedUnitId = ref<number>(0);
const route = useRoute();
const idGrupo = Number(route.params.id);

const openEditModal = async (id: number) => {
  const response = await UnitStore.GetStoreUnit(id);
  if (response?.success) {
    modalEdit.value = true;
    selectedUnit.value = UnitStore.unit;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el curso', detail: 'Verifica su existencia', life: 2000 });
  }
};

const confirmEdit = async (unit: Units) => {
  const response = await UnitStore.PutStoreUnit(unit, idGrupo);
  if (response?.success) {
    modalEdit.value = false;
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se ha actualizado el curso!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const confirmCreate = async (unit: Units) => {
  const response = await UnitStore.PostStoreUnit(unit, idGrupo);
  if (response?.success) {
    modalCreate.value = false;
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha creado el curso!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

const openDeleteModal = async (id: number) => {
  const response = await UnitStore.GetStoreUnit(id);
  if (response?.success) {
    modalDelete.value = true;
    selectedUnitId.value = id;
  } else {
    toast.add({ severity: 'error', summary: 'No se encontró el curso', detail: 'Verifica su existencia', life: 2000 });
  }
};

const confirmDelete = async (id: number) => {
  const response = await UnitStore.DeleteStoreUnit(id, idGrupo);
  if (response?.success) {
    modalDelete.value = false;
    toast.add({ severity: 'success', summary: '¡Eliminado Correctamente!', detail: '¡Se ha eliminado el curso!', life: 2000 });
  } else {
    toast.add({ severity: 'error', summary: '¡Ocurrió un error!', detail: response?.message, life: 2000 });
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await GetUnits(Number(route.params.id));
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
    <GeneralTable :loading="loading" title="Unidades" :data="UnitStore.unitsList" :columns="columnsUnits"
      @edit="openEditModal" @delete="openDeleteModal" @create="modalCreate = true">
    </GeneralTable>

    <CreateModal :id="Number(route.params.id)" :showModal="modalCreate" @close="modalCreate = false"
      @create="confirmCreate" />

    <EditModalUnit :modalItem="selectedUnit" :showModal="modalEdit" @close="modalEdit = false" @update="confirmEdit" />
    <DeleteModal :showModal="modalDelete" :id="selectedUnitId" @close="modalDelete = false" @delete="confirmDelete" />
  </AppLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import GeneralTable from '@/components/GeneralTable.vue'
import AppLayout from '@/layout/AppLayout.vue'
import { usePersonStore } from '@/stores/PersonStore'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import CreateModal from './Modals/CreatePersonModal.vue'
import EditModal from './Modals/EditPersonModal.vue'
import DeleteModal from '@/components/crud/DeleteModal.vue'
import type { IPerson } from '@/types/Persons'
import { GetPersons } from '@/utils/helpers'
import { columnsPerson } from '@/components/crud/PersonComponents/TableColumns'

const toast = useToast()
const loading = ref(false)
const personsStore = usePersonStore()
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const modalItem = ref<IPerson>({} as IPerson)
const idItem = ref<number>(0)

const HandleEdit = async (id: number) => {
  const response = await personsStore.GetStorePerson(id)
  if (response?.success) {
    showEditModal.value = true
    modalItem.value = response.data
  } else {
    toast.add({
      severity: 'error',
      summary: 'No se encontró a la persona',
      detail: 'Verifica su existencia',
      life: 2000,
    })
  }
}

const EditConfirm = async (person: IPerson) => {
  const response = await personsStore.PutStorePerson(person)
  if (response?.success) {
    showEditModal.value = false
    toast.add({
      severity: 'success',
      summary: '¡Actualizado Correctamente!',
      detail: 'Se ha actualizado la persona',
      life: 2000,
    })
  } else {
    toast.add({
      severity: 'error',
      summary: '¡Ocurrió un error!',
      detail: response?.message,
      life: 2000,
    })
  }
}

const CreateConfirm = async (person: IPerson) => {
  const response = await personsStore.PostStorePerson(person)
  if (response?.success) {
    showCreateModal.value = false
    toast.add({
      severity: 'success',
      summary: '¡Creado Correctamente!',
      detail: 'Se ha creado la persona',
      life: 2000,
    })
  } else {
    toast.add({
      severity: 'error',
      summary: '¡Ocurrió un error!',
      detail: response?.message,
      life: 2000,
    })
  }
}

const HandleDelete = async (id: number) => {
  const response = await personsStore.GetStorePerson(id)
  if (response?.success) {
    showDeleteModal.value = true
    idItem.value = id
  } else {
    toast.add({
      severity: 'error',
      summary: 'No se encontró a la persona',
      detail: 'Verifica su existencia',
      life: 2000,
    })
  }
}

const DeleteConfirm = async (id: number) => {
  const response = await personsStore.DeleteStorePerson(id)
  if (response?.success) {
    showDeleteModal.value = false
    toast.add({
      severity: 'success',
      summary: '¡Eliminado Correctamente!',
      detail: 'Se ha eliminado la persona',
      life: 2000,
    })
  } else {
    toast.add({
      severity: 'error',
      summary: '¡Ocurrió un error!',
      detail: response?.message,
      life: 2000,
    })
  }
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await GetPersons()
    if (res?.success) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  } catch (error) {
    console.error('Error al cargar los datos:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <AppLayout>
    <Toast />
    <GeneralTable
      :loading="loading"
      :title="'Personas'"
      :data="personsStore.personsList"
      :columns="columnsPerson"
      @edit="HandleEdit"
      @delete="HandleDelete"
      @create="showCreateModal = true"
    />

    <CreateModal
      :showModal="showCreateModal"
      @close="showCreateModal = false"
      @create="CreateConfirm"
      @update="EditConfirm"
      @update:visible="showCreateModal = false"
    />
    <EditModal
      :showModal="showEditModal"
      :modalItem="modalItem"
      @close="showEditModal = false"
      @update="EditConfirm"
      @update:visible="showEditModal = false"
    />

    <DeleteModal
      :showModal="showDeleteModal"
      :id="idItem"
      @close="showDeleteModal = false"
      @delete="DeleteConfirm"
      @update:visible="showDeleteModal = false"
    />
  </AppLayout>
</template>

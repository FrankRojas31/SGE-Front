<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import GeneralTable from '@/components/GeneralTable.vue'
import AppLayout from '@/layout/AppLayout.vue'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import CreateModal from './Modals/CreateUserModal.vue'
import EditModal from './Modals/EditUserModal.vue'
import DeleteModal from '@/components/crud/DeleteModal.vue'
import type { IUser } from '@/types/Users'
import { columnsUser } from '@/components/crud/UserComponents/TableColumns'

const toast = useToast()
const loading = ref(false)
const usersStore = useUserStore()
const openCreateModal = ref(false)
const openEditModal = ref(false)
const openDeleteModal = ref(false)
const modalItem = ref<IUser>({} as IUser)
const idItem = ref<number>(0)

onMounted(async () => {
  loading.value = true
  try {
    await usersStore.GetUsersStore();
  } catch (error) {
    console.error('Error al cargar los datos:', error)
  } finally {
    loading.value = false
  }
})

const HandleEdit = async (id: number) => {
  const user = usersStore.usersList.find(u => (u.id as any) === id)
  if (user) {
    modalItem.value = user as any as IUser
    openEditModal.value = true
  }
}

const HandleDelete = (id: number) => {
  idItem.value = id
  openDeleteModal.value = true
}

const CreateConfirm = async (user: IUser) => {
  loading.value = true
  try {
    await usersStore.GetUsersStore()
    openCreateModal.value = false
    toast.add({ severity: 'success', summary: '¡Creado Correctamente!', detail: '¡Se ha agregado el usuario!', life: 2000 })
  } catch (error) {
    console.error('Error al crear usuario:', error)
    toast.add({ severity: 'error', summary: '¡Error!', detail: 'No se pudo crear el usuario', life: 2000 })
  } finally {
    loading.value = false
  }
}

const EditConfirm = async (user: IUser) => {
  loading.value = true
  try {
    await usersStore.GetUsersStore()
    openEditModal.value = false
    toast.add({ severity: 'success', summary: '¡Actualizado Correctamente!', detail: '¡Se ha actualizado el usuario!', life: 2000 })
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    toast.add({ severity: 'error', summary: '¡Error!', detail: 'No se pudo actualizar el usuario', life: 2000 })
  } finally {
    loading.value = false
  }
}

const DeleteConfirm = async (id: number) => {
  loading.value = true
  try {
    await usersStore.GetUsersStore()
    openDeleteModal.value = false
    toast.add({ severity: 'success', summary: '¡Eliminado Correctamente!', detail: '¡Se ha eliminado el usuario!', life: 2000 })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    toast.add({ severity: 'error', summary: '¡Error!', detail: 'No se pudo eliminar el usuario', life: 2000 })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppLayout>
    <Toast />
    <GeneralTable :loading="loading" title="Usuarios" :data="usersStore.usersList" :columns="columnsUser"
      @edit="HandleEdit" @delete="HandleDelete" @create="openCreateModal = true" />

    <CreateModal :showModal="openCreateModal" @close="openCreateModal = false" @create="CreateConfirm" />
    <EditModal :showModal="openEditModal" :modalItem="modalItem" @close="openEditModal = false" @update="EditConfirm" />
    <DeleteModal :showModal="openDeleteModal" :id="idItem" @close="openDeleteModal = false" @delete="DeleteConfirm" />
  </AppLayout>
</template>

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
const idItem = ref<string>('')

const HandleEdit = async (id: string) => {
  try {
    await usersStore.fetchUserById(id)
    if (usersStore.selectedUser) {
      openEditModal.value = true
      modalItem.value = { ...usersStore.selectedUser }
    } else {
      toast.add({
        severity: 'error',
        summary: 'No se encontró al usuario',
        detail: 'Verifica su existencia',
        life: 2000,
      })
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error)
  }
}

const EditConfirm = async (user: IUser) => {
  try {
    await usersStore.updateUser(user)
    openEditModal.value = false
    toast.add({
      severity: 'success',
      summary: '¡Actualizado Correctamente!',
      detail: 'Se ha actualizado el usuario',
      life: 2000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: '¡Ocurrió un error!',
      detail: 'No se pudo actualizar el usuario',
      life: 2000,
    })
  }
}

const CreateConfirm = async (user: IUser) => {
  try {
    await usersStore.addUser(user)
    openCreateModal.value = false
    toast.add({
      severity: 'success',
      summary: '¡Creado Correctamente!',
      detail: 'Se ha creado el usuario',
      life: 2000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: '¡Ocurrió un error!',
      detail: 'No se pudo crear el usuario',
      life: 2000,
    })
  }
}

const HandleDelete = async (id: string) => {
  try {
    await usersStore.fetchUserById(id)
    if (usersStore.selectedUser) {
      openDeleteModal.value = true
      idItem.value = id
    } else {
      toast.add({
        severity: 'error',
        summary: 'No se encontró al usuario',
        detail: 'Verifica su existencia',
        life: 2000,
      })
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error)
  }
}

const DeleteConfirm = async (id: string) => {
  try {
    await usersStore.removeUser(id)
    openDeleteModal.value = false
    toast.add({
      severity: 'success',
      summary: '¡Eliminado Correctamente!',
      detail: 'Se ha eliminado el usuario',
      life: 2000,
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: '¡Ocurrió un error!',
      detail: 'No se pudo eliminar el usuario',
      life: 2000,
    })
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await usersStore.fetchUsers()
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
      title="Usuarios"
      :data="usersStore.users"
      :columns="columnsUser"
      @edit="HandleEdit"
      @delete="HandleDelete"
      @create="openCreateModal = true"
    />

    <CreateModal :showModal="openCreateModal" @close="openCreateModal = false" @create="CreateConfirm"/>
    <EditModal
      :showModal="openEditModal"
      :modalItem="modalItem"
      @close="openEditModal = false"
      @update="EditConfirm"
    />
    <DeleteModal
      :showModal="openDeleteModal"
      :id="idItem"
      @close="openDeleteModal = false"
      @delete="DeleteConfirm"
    />
  </AppLayout>
</template>

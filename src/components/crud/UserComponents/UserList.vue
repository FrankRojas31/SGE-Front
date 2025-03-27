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
</script>

<template>
  <AppLayout>
    <Toast />
    <GeneralTable :loading="loading" title="Usuarios" :data="usersStore.usersList" :columns="columnsUser" @edit="HandleEdit"
      @delete="HandleDelete" @create="openCreateModal = true" />

    <CreateModal :showModal="openCreateModal" @close="openCreateModal = false" @create="CreateConfirm" />
    <EditModal :showModal="openEditModal" :modalItem="modalItem" @close="openEditModal = false" @update="EditConfirm" />
    <DeleteModal :showModal="openDeleteModal" :id="idItem" @close="openDeleteModal = false" @delete="DeleteConfirm" />
  </AppLayout>
</template>

import { GetUsers } from '@/api/services/UserService'
import type { IAuthUser, IAuthUsers } from '@/types/Auth/Users'
import type { IUser } from '@/types/Users'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const usersList = ref<(IAuthUsers | IUser)[]>([])
  const user = ref<IAuthUsers | IUser | null>(null)

  async function GetUsersStore() {
    const response = await GetUsers()

    if (response?.success) {
      usersList.value = response.data as any
    }

    return response
  }

  return { GetUsersStore, usersList, user }
})

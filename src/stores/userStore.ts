import { GetUsers } from "@/api/services/UserService";
import type { IAuthUser, IAuthUsers } from '@/types/Auth/Users'
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const usersList = ref<IAuthUsers[]>([]);

  async function GetUsersStore(){
    const response = await GetUsers();

    if(response?.success){
      usersList.value = response.data;
    }

    return response;
  }

  return { GetUsersStore, usersList }
});

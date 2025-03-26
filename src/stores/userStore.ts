import { defineStore } from "pinia";
import { UserService } from "@/api/services/UserService";
import type { IUser } from "@/types/Users";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as IUser[],
    selectedUser: null as IUser | null,
  }),
  actions: {
    async fetchUsers() {
      try {
        this.users = await UserService.getUsers();
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    },

    async fetchUserById(id: string) {
      try {
        this.selectedUser = await UserService.getUserById(id);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    },

    async addUser(user: IUser) {
      try {
        await UserService.createUser(user);
        await this.fetchUsers();
      } catch (error) {
        console.error("Error al crear usuario:", error);
      }
    },

    async updateUser(user: IUser) {
      try {
        await UserService.updateUser(user);
        await this.fetchUsers();
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
      }
    },

    async removeUser(id: string) {
      try {
        await UserService.deleteUser(id);
        await this.fetchUsers();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    },
  },
});

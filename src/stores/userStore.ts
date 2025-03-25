import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: 'Juan de Dios',
      email: 'juan@example.com',
      avatar: 'https://via.placeholder.com/150',
      phone: '123-456-7890',
      address: 'Calle Falsa 123'
    }
  }),
  actions: {
    setUser(userData: never) {
      this.user = userData;
    }
  }
});

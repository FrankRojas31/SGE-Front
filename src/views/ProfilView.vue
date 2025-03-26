  <script lang="ts" setup>
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import { useUserStore } from '@/stores/userStore';
  import { ref } from 'vue';
  import { useToast } from 'primevue/usetoast';
  import Toast from 'primevue/toast';
  import AppLayout from '@/layout/AppLayout.vue';

  const toast = useToast();
  const userStore = useUserStore();
  const showModal = ref(false);
  const editedUser = ref({ ...userStore.user });

  const openModal = () => {
    editedUser.value = { ...userStore.user };
    showModal.value = true;
  };

  const saveChanges = () => {
    userStore.user = { ...editedUser.value };
    showModal.value = false;
    toast.add({ severity: 'success', summary: 'Perfil actualizado', life: 3000 });
  };
</script>

  <template>
    <AppLayout>
      <div class="flex justify-center items-center min-h-[calc(100vh-5rem)] py-12">
        <div
          class="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <div class="p-10">
            <Toast />
            <div class="flex flex-col items-center text-center space-y-4">
              <div
                class="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg mb-4">
                <span class="text-5xl font-bold text-white">{{ userStore.user.name.charAt(0) }}</span>
              </div>
              <h3 class="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{{ userStore.user.name }}</h3>
              <p class="text-xl text-gray-500 dark:text-gray-300">{{ userStore.user.email }}</p>
            </div>

            <div class="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Información de Contacto</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                    </path>
                  </svg>
                  <p class="text-lg text-gray-600 dark:text-gray-300">{{ userStore.user.phone || 'No especificado' }}
                  </p>
                </div>
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-emerald-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <p class="text-lg text-gray-600 dark:text-gray-300">{{ userStore.user.address || 'No especificada' }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-12 flex justify-center">
              <button @click="openModal"
                class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span class="text-base">Editar Perfil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog v-model:visible="showModal" modal :style="{ width: '40rem' }"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" class="rounded-xl shadow-xl border-0">

        <template #header>
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">Editar información del perfil</h3>
          </div>
        </template>

        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Nombre completo</label>
            <InputText v-model="editedUser.name" placeholder="Ingrese su nombre"
              class="w-full text-gray-800 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Correo electrónico</label>
            <InputText v-model="editedUser.email" placeholder="Ingrese su correo"
              class="w-full text-gray-800 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Teléfono</label>
              <InputText v-model="editedUser.phone" placeholder="Ingrese su teléfono"
                class="w-full text-gray-800 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Dirección</label>
              <InputText v-model="editedUser.address" placeholder="Ingrese su dirección"
                class="w-full text-gray-800 dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <Button label="Cancelar" severity="secondary" @click="showModal = false"
              class="px-5 py-2.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg" />
            <Button label="Guardar cambios" severity="success" @click="saveChanges"
              class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" />
          </div>
        </template>
      </Dialog>
    </AppLayout>
  </template>

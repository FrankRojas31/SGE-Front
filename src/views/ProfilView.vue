<template>
  <AppLayout>
    <div class="bg-surface-50 dark:bg-gray-950 px-6 py-12 md:px-16 lg:px-24 flex justify-center">
      <div class="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden p-8">
        <Toast />
        <div class="flex flex-col items-center text-center">
          <!-- Usar el valor de isEditing para mostrar el contenido -->
          <h3 v-if="!isEditing" class="text-3xl font-bold text-gray-900 dark:text-white mt-4">{{ userStore.user.name }}</h3>
          <input v-else v-model="userStore.user.name" class="text-3xl font-bold text-gray-900 dark:text-white mt-4 border p-2 rounded" />
          <p v-if="!isEditing" class="text-gray-500 dark:text-gray-300">{{ userStore.user.email }}</p>
          <input v-else v-model="userStore.user.email" class="text-gray-500 dark:text-gray-300 border p-2 rounded" />
        </div>
        <div class="mt-6 border-t border-gray-300 dark:border-gray-600 pt-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Información de Contacto</h3>
          <p v-if="!isEditing" class="text-gray-600 dark:text-gray-300 mt-2"><strong>Teléfono:</strong> {{ userStore.user.phone }}</p>
          <input v-else v-model="userStore.user.phone" class="text-gray-600 dark:text-gray-300 border p-2 rounded mt-2" />
          <p v-if="!isEditing" class="text-gray-600 dark:text-gray-300"><strong>Dirección:</strong> {{ userStore.user.address }}</p>
          <input v-else v-model="userStore.user.address" class="text-gray-600 dark:text-gray-300 border p-2 rounded" />
        </div>
        <div class="mt-6 flex justify-center">
          <button
            @click="toggleEdit"
            class="px-6 py-3 bg-[#10B981] text-white text-lg font-semibold rounded-lg shadow-xl hover:bg-[#059669] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2"
          >
            <span class="flex items-center">
              {{ isEditing ? 'Guardar Cambios' : 'Editar Perfil' }}
              <svg v-if="!isEditing" class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              <svg v-else class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast'

const toast = useToast();
const userStore = useUserStore();
const isEditing = ref(false);

const toggleEdit = () => {
  isEditing.value = !isEditing.value;

  if (isEditing.value) {
    toast.add({ severity: 'info', summary: 'Editando perfil', life: 3000 });
  } else {
    toast.add({ severity: 'success', summary: 'Cambios guardados', life: 3000 });
  }
};
</script>

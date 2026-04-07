import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetCalifications, PostCalification, GetCalification, PutCalification, DeleteCalification } from '@/api/services/CalificationService';
import type { ICalifications } from '@/types/Califications';

export const useCalificationsStore = defineStore('Califications', () => {
  const calificationsList = ref<ICalifications[]>([]);
  const calification = ref<ICalifications>({} as ICalifications);

  // Obtener todas las calificaciones
  async function GetStoreCalifications() {
    const response = await GetCalifications();
    if (response?.success === true) {
      calificationsList.value = response.data;
    }
    return response;
  }

  // Crear una nueva calificación
  async function PostStoreCalification(calificacion: ICalifications) {
    const response = await PostCalification(calificacion);
    if (response?.success === true) {
      await GetStoreCalifications(); // Refrescar la lista tras éxito
    }
    return response;
  }

  // Obtener una calificación por ID
  async function GetStoreCalification(id: number) {
    const response = await GetCalification(id);
    if (response?.success === true) {
      calification.value = response.data;
    }
    return response;
  }

  // Actualizar una calificación
  async function PutStoreCalification(calificacion: ICalifications) {
    const response = await PutCalification(calificacion);
    if (response?.success === true) {
      await GetStoreCalifications(); // Refrescar la lista tras éxito
    }
    return response;
  }

  // Eliminar una calificación por ID
  async function DeleteStoreCalification(id: number) {
    const response = await DeleteCalification(id);
    if (response?.success === true) {
      await GetStoreCalifications(); // Refrescar la lista tras éxito
    }
    return response;
  }

  return {
    GetStoreCalifications,
    PostStoreCalification,
    GetStoreCalification,
    PutStoreCalification,
    DeleteStoreCalification,
    calificationsList,
    calification,
  };
});

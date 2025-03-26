import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetUnits, PostUnit, GetUnit, PutUnit, DeleteUnit } from '@/api/services/unitService';
import type { Units } from '@/types/Unit';

export const useUnitsStore = defineStore('Units', () => {
  const unitsList = ref<Units[]>([]);
  const unit = ref<Units>({} as Units);

  async function GetStoreUnits(id: number) {
    const response = await GetUnits(id);
    if (response?.success === true) {
      unitsList.value = response.data;
    }
    return response;
  }

  async function PostStoreUnit(unit: Units, id:number) {
    const response = await PostUnit(unit);
    if (response?.success === true) {
      await GetStoreUnits(id);
    }
    return response;
  }

  async function GetStoreUnit(id: number) {
    const response = await GetUnit(id);
    if (response?.success === true) {
      unit.value = response.data;
    }
    return response;
  }

  async function PutStoreUnit(unit: Units, id:number) {
    const response = await PutUnit(unit);
    if (response?.success === true) {
      await GetStoreUnits(id);
    }
    return response;
  }

  async function DeleteStoreUnit(id: number, idgroup: number) {
    const response = await DeleteUnit(id);
    if (response?.success === true) {
      await GetStoreUnits(idgroup);
    }
    return response;
  }

  return { GetStoreUnits, PostStoreUnit, GetStoreUnit, PutStoreUnit, DeleteStoreUnit, unitsList, unit };
});

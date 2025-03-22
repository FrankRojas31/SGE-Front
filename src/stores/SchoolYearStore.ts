import { DeleteSchoolYear, GetSchoolYear, GetSchoolYears, PostSchoolYear, PutSchoolYear } from "@/api/services/SchoolYearServices";
import type { ISchoolYear} from "@/types/SchoolYear";
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSchoolYearStore = defineStore('SchoolYear', () => {
  const schoolYearsList = ref<ISchoolYear[]>([]);
  const schoolYear = ref<ISchoolYear>({} as ISchoolYear);

  async function GetStoreSchoolYears(){
    const response = await GetSchoolYears();

    if(response?.success === true){
      schoolYearsList.value = response.data;
    }

    return response;
  }

  async function PostStoreSchoolYear(SchoolYear: ISchoolYear){
    const response = await PostSchoolYear(SchoolYear);

    if(response?.success === true){
      await GetStoreSchoolYears();
    }

    return response;
  }

  async function GetStoreSchoolYear(id: number){
    const response = await GetSchoolYear(id);

    if(response?.success === true){
      schoolYear.value = response.data;
    }
    return response;
  }

  async function PutStoreSchoolYear(SchoolYear: ISchoolYear){
    const response = await PutSchoolYear(SchoolYear);

    if (response?.success === true){
      await GetStoreSchoolYears();
    }

    return response;
  }

  async function DeleteStoreSchoolYear(id: number){
    const response = await DeleteSchoolYear(id);

    if (response?.success === true){
      await GetStoreSchoolYears();
    }
    return response;
  }

  return { GetStoreSchoolYears, PostStoreSchoolYear, GetStoreSchoolYear, PutStoreSchoolYear, DeleteStoreSchoolYear, schoolYearsList, schoolYear };
});

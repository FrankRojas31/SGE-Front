import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetTeachers, PostTeacher, GetTeacher, PutTeacher, DeleteTeacher } from '@/api/services/TeachersService';  // Cambié a TeachersService
import type { ITeachers } from '@/types/Teachers';

export const useTeachersStore = defineStore('Teachers', () => {
  const teachersList = ref<ITeachers[]>([]);
  const teacher = ref<ITeachers>({} as ITeachers);

  async function GetStoreTeachers() {
    const response = await GetTeachers();
    if (response?.success === true) {
      teachersList.value = response.data;
    }
    return response;
  }

  async function PostStoreTeacher(teacher: ITeachers) {
    const response = await PostTeacher(teacher);
    if (response?.success === true) {
      await GetStoreTeachers();
    }
    return response;
  }

  async function GetStoreTeacher(id: number) {
    const response = await GetTeacher(id);
    if (response?.success === true) {
      teacher.value = response.data;
    }
    return response;
  }

  async function PutStoreTeacher(teacher: ITeachers) {
    const response = await PutTeacher(teacher);
    if (response?.success === true) {
      await GetStoreTeachers();
    }
    return response;
  }

  async function DeleteStoreTeacher(id: number) {
    const response = await DeleteTeacher(id);
    if (response?.success === true) {
      await GetStoreTeachers();
    }
    return response;
  }

  return { GetStoreTeachers, PostStoreTeacher, GetStoreTeacher, PutStoreTeacher, DeleteStoreTeacher, teachersList, teacher };
});

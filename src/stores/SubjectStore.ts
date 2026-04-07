// src/stores/SubjectStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DeleteSubject, GetSubject, GetSubjects, PostSubject, PutSubject, GetUnitsForSubject } from '@/api/services/SubjectsServices';
import type { ISubject } from '@/types/Subject';

export const useSubjectStore = defineStore('useSubjectStore', () => {
  const subjectsList = ref<ISubject[]>([]);
  const subject = ref<ISubject>({} as ISubject);

  // Método simplificado para obtener unidades de una materia específica
  async function GetStoreUnitsForSubject(subjectId: number) {
    try {
      const response = await GetUnitsForSubject(subjectId);
      return response;
    } catch (error) {
      console.error(`Error al obtener unidades para la materia ${subjectId}:`, error);
      return { success: false, message: 'Error al obtener unidades de la materia' };
    }
  }

  async function GetStoreSubjects() {
    try {
      const response = await GetSubjects();
      if (response?.success === true) {
        subjectsList.value = response.data;
      }
      return response;
    } catch (error) {
      console.error('Error al obtener materias:', error);
      return { success: false, message: 'Error al obtener materias' };
    }
  }

  async function PostStoreSubject(subject: ISubject) {
    try {
      const response = await PostSubject(subject);
      if (response?.success === true) {
        await GetStoreSubjects();
      }
      return response;
    } catch (error) {
      console.error('Error al crear materia:', error);
      return { success: false, message: 'Error al crear materia' };
    }
  }

  async function GetStoreSubject(id: number) {
    try {
      const response = await GetSubject(id);
      if (response?.success === true) {
        subject.value = response.data;
      }
      return response;
    } catch (error) {
      console.error(`Error al obtener materia ${id}:`, error);
      return { success: false, message: 'Error al obtener materia' };
    }
  }

  async function PutStoreSubject(subject: ISubject) {
    try {
      const response = await PutSubject(subject);
      if (response?.success === true) {
        await GetStoreSubjects();
      }
      return response;
    } catch (error) {
      console.error('Error al actualizar materia:', error);
      return { success: false, message: 'Error al actualizar materia' };
    }
  }

  async function DeleteStoreSubject(id: number) {
    try {
      const response = await DeleteSubject(id);
      if (response?.success === true) {
        await GetStoreSubjects();
      }
      return response;
    } catch (error) {
      console.error(`Error al eliminar materia ${id}:`, error);
      return { success: false, message: 'Error al eliminar materia' };
    }
  }

  return {
    GetStoreSubjects,
    PostStoreSubject,
    GetStoreSubject,
    PutStoreSubject,
    DeleteStoreSubject,
    GetStoreUnitsForSubject, // Aseguramos que este método esté exportado
    subjectsList,
    subject,
  };
});

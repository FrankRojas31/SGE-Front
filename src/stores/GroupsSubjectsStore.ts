import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetGroupSubjects, PostGroupsSubjects, GetGroupsSubjects, PutGroupSubjects, GetMateriasSinGrupo, GetMateriasConGrupos, PostMateriasaGrupos, DeleteGroupsSubject } from '@/api/services/GroupsSubjectsServices';
import type { IGroupsSubjects } from '@/types/GroupsSubjects';

export const useGroupsSubjectStore = defineStore('GroupsSubjects', () => {
  const groupsSubjectsList = ref<IGroupsSubjects[]>([]);
  const groupsSubjects = ref<IGroupsSubjects>({} as IGroupsSubjects);

  // Obtener todas las relaciones grupo-materia
  async function GetStoreGroupSubjects() {
    const response = await GetGroupsSubjects();
    if (response?.success) {
      groupsSubjectsList.value = response.data;
    }
    return response;
  }

  // Crear una nueva relación grupo-materia
  async function PostStoreGroupsSubjects(groupsSubjects: IGroupsSubjects) {
    const response = await PostGroupsSubjects(groupsSubjects);
    if (response?.success === true) {
      await GetStoreGroupSubjects(); // Refrescar la lista
    }
    return response;
  }

  // Obtener una relación específica por ID
  async function GetStoreGroupSubject(id: number) {
    const response = await GetGroupSubjects(id);
    if (response?.success === true) {
      groupsSubjects.value = response.data;
    }
    return response;
  }

  // Actualizar una relación existente
  async function PutStoreGroupsSubjects(groupsSubjects: IGroupsSubjects) {
    const response = await PutGroupSubjects(groupsSubjects);
    if (response?.success === true) {
      await GetStoreGroupSubjects(); // Refrescar la lista
    }
    return response;
  }

  // Eliminar una relación por ID
  async function DeleteStoreGroupsSubjects(id: number, IdMateria:number[]) {
    const response = await DeleteGroupsSubject(id,IdMateria);
    if (response?.success === true) {
      await GetStoreGroupSubjects(); // Refrescar la lista
    }
    return response;
  }

  // Obtener materias sin grupo
  async function GetStoreGroupsSubjectsWithoutGroup(id: number) {
    const response = await GetMateriasSinGrupo(id);
    if (response?.success === true) {
      groupsSubjectsList.value = response.data;
    }
    return response;
  }

  // Obtener materias con grupo
  async function GetStoreGroupsSubjectsWithGroup(id: number) {
    const response = await GetMateriasConGrupos(id);
    if (response?.success === true) {
      groupsSubjectsList.value = response.data;
    }
    return response;
  }

  // Asignar materias a un grupo
  async function PostStoreMateriasaGrupo(id: number, IdMaterias: number[]) {
    const response = await PostMateriasaGrupos(id, IdMaterias);
    if (response?.success === true) {
      await GetStoreGroupsSubjectsWithGroup(id); // Refrescar solo las materias del grupo
    }
    return response;
  }

  return {
    GetStoreGroupSubjects,
    PostStoreGroupsSubjects,
    GetStoreGroupSubject,
    PutStoreGroupsSubjects,
    DeleteStoreGroupsSubjects,
    GetStoreGroupsSubjectsWithoutGroup,
    GetStoreGroupsSubjectsWithGroup,
    PostStoreMateriasaGrupo,
    groupsSubjectsList,
    groupsSubjects,
  };
});

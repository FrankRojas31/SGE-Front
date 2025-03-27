import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetGroupsStudent, PostGroupsStudent, GetGroupStudent, PutGroupStudent, DeleteGroupsStudent, GetAlumnoSinGrupo , GetAlumnoConGrupo, PostAlumnosaGrupo} from '@/api/services/GroupsStudentServices';
import type { IGroupsStudent } from '@/types/GroupsStudent';

export const useGroupsStudentStore = defineStore('GroupsStudent', () => {
  const groupsStudentList = ref<IGroupsStudent[]>([]);
  const groupStudent = ref<IGroupsStudent>({} as IGroupsStudent);

  // Obtener todas las relaciones grupo-alumno
  async function GetStoreGroupsStudent() {
    const response = await GetGroupsStudent();
    if (response?.success === true) {
      groupsStudentList.value = response.data;
    }
    return response;
  }

  // Crear una nueva relación grupo-alumno
  async function PostStoreGroupsStudent(groupStudent: IGroupsStudent) {
    const response = await PostGroupsStudent(groupStudent);
    if (response?.success === true) {
      await GetStoreGroupsStudent(); // Refrescar la lista
    }
    return response;
  }

  // Obtener una relación específica por ID
  async function GetStoreGroupStudent(id: number) {
    const response = await GetGroupStudent(id);
    if (response?.success === true) {
      groupStudent.value = response.data;
    }
    return response;
  }

  // Actualizar una relación existente
  async function PutStoreGroupStudent(groupStudent: IGroupsStudent) {
    const response = await PutGroupStudent(groupStudent);
    if (response?.success === true) {
      await GetStoreGroupsStudent(); // Refrescar la lista
    }
    return response;
  }

  // Eliminar una relación por ID
  async function DeleteStoreGroupsStudent(id: number, idStudents: number[]) {
    const response = await DeleteGroupsStudent(id, idStudents);
    if (response?.success === true) {
      await GetStoreGroupsStudent();
    }
    return response;
  }

  // Obtener todos los alumnos sin grupo
  async function GetStoreGroupsStudentsWhithoutGroup() {
    const response = await GetAlumnoSinGrupo();
    if (response?.success === true) {
      groupsStudentList.value = response.data;
    }
    return response;
  }

  // Obtener todos los alumnos con grupo
  async function GetStoreGroupsStudentsWhithGroup(id: number) {
    const response = await GetAlumnoConGrupo(id);
    if (response?.success === true) {
      groupsStudentList.value = response.data;
    }
    return response;
  }


  // Asignar alumnos a un grupo
async function PostStoreAlumnosaGrupo(id: number, idAlumnos: number[]) {
  const response = await PostAlumnosaGrupo(id, idAlumnos);
  if (response?.success === true) {
    await GetStoreGroupsStudentsWhithGroup(id); // Refrescar solo los alumnos del grupo
  }
  return response;
}
  return {
    GetStoreGroupsStudent,
    PostStoreGroupsStudent,
    GetStoreGroupStudent,
    PutStoreGroupStudent,
    DeleteStoreGroupsStudent,
    GetStoreGroupsStudentsWhithoutGroup,
    GetStoreGroupsStudentsWhithGroup,
    PostStoreAlumnosaGrupo,
    groupsStudentList,
    groupStudent,
  };
});

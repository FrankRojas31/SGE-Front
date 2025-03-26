import type { IGroupsStudent } from "@/types/GroupsStudent";
import { GenericRequest } from "../GenericRequest";

const urlBase = "GruposAlumnos";

// GET: '/GruposAlumnos'
export async function GetGroupsStudent() {
  return await GenericRequest<IGroupsStudent[]>({ url: urlBase, method: "GET" });
}

// POST: '/GruposAlumnos'
export async function PostGroupsStudent(groupStudent: IGroupsStudent) {
  return await GenericRequest<IGroupsStudent>({
    url: urlBase,
    method: "POST",
    data: {
      nombre: groupStudent.nombre,
      descripcion: groupStudent.descripcion,
      idGrupo: groupStudent.idGrupo,
      idAlumno: groupStudent.idAlumno,
    },
  });
}

// GET: '/GruposAlumnos/{id}'
export async function GetGroupStudent(id: number) {
  return await GenericRequest<IGroupsStudent>({ url: `${urlBase}/${id}`, method: "GET" });
}

// PUT: '/GruposAlumnos/{id}'
export async function PutGroupStudent(groupStudent: IGroupsStudent) {
  return await GenericRequest<IGroupsStudent>({
    url: `${urlBase}/${groupStudent.id}`,
    method: "PUT",
    data: {
      id: groupStudent.id,
      nombre: groupStudent.nombre,
      descripcion: groupStudent.descripcion,
      idGrupo: groupStudent.idGrupo,
      idAlumno: groupStudent.idAlumno,
    },
  });
}

// DELETE: '/GruposAlumnos/{id}'
export async function DeleteGroupsStudent(id: number) {
  return await GenericRequest<IGroupsStudent>({ url: `${urlBase}/${id}`, method: "DELETE" });
}
// GET: '/GruposAlumnos/GetAlumnoSinGrupo'
export async function GetAlumnoSinGrupo() {
  return await GenericRequest<IGroupsStudent[]>({ url: `${urlBase}/GetAlumnosSinGrupo`, method: "GET" });
}

// GET: '/GruposAlumnos/GetAlumnoConGrupo'
export async function GetAlumnoConGrupo(id: number) {
  return await GenericRequest<IGroupsStudent[]>({ url: `${urlBase}/GetAlumnosConGrupo/${id}`, method: "GET" });
}

// POST: '/GruposAlumnos/PostAlumnosaGrupo/{id}'
export async function PostAlumnosaGrupo(id: number, idAlumnos: number[]) {
  return await GenericRequest<{ success: boolean }>({
    url: `${urlBase}/PostAlumnosaGrupo/${id}`,
    method: "POST",
    data: idAlumnos,
  });
}

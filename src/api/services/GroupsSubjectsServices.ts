import type { IGroupsSubjects } from "@/types/GroupsSubjects";
import { GenericRequest } from "../GenericRequest";

const urlBase = "MateriaGrupo";

// GET: '/MateriaGrupo'
export async function GetGroupsSubjects() {
  return await GenericRequest<IGroupsSubjects[]>({ url: urlBase, method: "GET" });
}

// POST: '/MateriaGrupo'
export async function PostGroupsSubjects(groupsSubjects: IGroupsSubjects) {
  return await GenericRequest<IGroupsSubjects>({
    url: urlBase,
    method: "POST",
    data: groupsSubjects,
  });
}

// GET: '/MateriaGrupo/{id}'
export async function GetGroupSubjects(id: number) {
  return await GenericRequest<IGroupsSubjects>({ url: `${urlBase}/${id}`, method: "GET" });
}

// PUT: '/MateriaGrupo/{id}'
export async function PutGroupSubjects(groupsSubjects: IGroupsSubjects) {
  return await GenericRequest<IGroupsSubjects>({
    url: `${urlBase}/${groupsSubjects.Id}`,
    method: "PUT",
    data: groupsSubjects,
  });
}

// DELETE: '/MateriaGrupo/{id}'
export async function DeleteGroupsSubjects(id: number) {
  return await GenericRequest<IGroupsSubjects>({ url: `${urlBase}/${id}`, method: "DELETE" });
}

// GET: '/MateriaGrupo/GetMateriaDeGrupo/{id}'
export async function GetMateriasConGrupos(id: number) {
  return await GenericRequest<IGroupsSubjects[]>({ url: `${urlBase}/GetMateriaDeGrupo/${id}`, method: "GET" });
}

// GET: '/MateriaGrupo/GetMateriaNoEnGrupo/{id}'
export async function GetMateriasSinGrupo(id: number) {
  return await GenericRequest<IGroupsSubjects[]>({ url: `${urlBase}/GetMateriaNoEnGrupo/${id}`, method: "GET" });
}

// POST: '/MateriaGrupo/PostMateriaAGrupo/{id}'
export async function PostMateriasaGrupos(id: number, IdMaterias: number[]) {
  return await GenericRequest<{ success: boolean }>({
    url: `${urlBase}/PostMateriaAGrupo/${id}`,
    method: "POST",
    data: IdMaterias,
  });

}
export async function DeleteGroupsSubject(id:number, IdMaterias: number[]) {
  return await GenericRequest<{ success: boolean }>({
    url: `${urlBase}/DeleteMateriaAGrupo/${id}`,
    method: "DELETE",
    data: IdMaterias,
  })
}


import type { Groups } from "@/types/Groups";
import { GenericRequest } from "../GenericRequest";

const urlBase = "Grupos";

export async function GetGroups() {
  return await GenericRequest<Groups[]>({
    url: `${urlBase}`,
    method: "GET",
  });
}

// GET: '/GetGruposEnPeriodo'
export async function GetGroupsInPeriodActive(){
  return await GenericRequest<Groups[]>({
    url: `${urlBase}/GetGruposEnPeriodo`,
    method: "GET"
  })
}

export async function GetGroup(id: number) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/${id}`,
    method: "GET",
  });
}

export async function PostGroup(group: Groups) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/PostGrupoEnPeriodo`,
    method: "POST",
    data: {
      nombre: group.nombre,
      descripcion: group.descripcion,
    },
  });
}

export async function PutGroup(group: Groups) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/${group.id}`,
    method: "PUT",
    data: {
      id: group.id,
      nombre: group.nombre,
      descripcion: group.descripcion,
    },
  });
}

export async function DeleteGroup(id: number) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/${id}`,
    method: "DELETE",
  });
}

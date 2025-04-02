import type { Groups } from "@/types/Groups";
import { GenericRequest } from "../GenericRequest";
import { useAuthStore } from "@/stores/auth/AuthStore.ts";
import { AuthUser, AuthUserId } from '@/utils/helpers.ts'

const urlBase = "Grupos";

export async function GetGroups() {
  return await GenericRequest<Groups[]>({
    url: `${urlBase}`,
    method: "GET",
    authToken: AuthUser()
  });
}

// GET: '/GetGruposEnPeriodo'
export async function GetGroupsInPeriodActive(){
  return await GenericRequest<Groups[]>({
    url: `${urlBase}/GetGruposEnPeriodo/${AuthUserId()}`,
    method: "GET",
    authToken: AuthUser()
  })
}

export async function GetGroup(id: number) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/${id}`,
    method: "GET",
    authToken: AuthUser()
  });
}

export async function PostGroup(group: Groups) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/PostGrupoEnPeriodo`,
    method: "POST",
    data: {
      nombre: group.nombre,
      descripcion: group.descripcion,
      idUsuario: group.idUsuario,
    },
    authToken: AuthUser()
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
      idUsuario: group.idUsuario
    },
    authToken: AuthUser()
  });
}

export async function DeleteGroup(id: number) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/${id}`,
    method: "DELETE",
    authToken: AuthUser()
  });
}

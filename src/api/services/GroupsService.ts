import type { Groups } from '@/types/Groups'
import { GenericRequest } from '../GenericRequest'
import { useAuthStore } from '@/stores/auth/AuthStore.ts'
import { AuthUser, AuthUserId } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetGroupsMock,
  GetGroupsInPeriodActiveMock,
  GetGroupMock,
  PostGroupMock,
  PutGroupMock,
  DeleteGroupMock,
} from '../mocks/GroupsService.mock'

const urlBase = 'Grupos'

export async function GetGroups() {
  if (isMockEnabled()) return GetGroupsMock()

  return await GenericRequest<Groups[]>({
    url: `${urlBase}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// GET: '/GetGruposEnPeriodo'
export async function GetGroupsInPeriodActive() {
  if (isMockEnabled()) return GetGroupsInPeriodActiveMock()

  return await GenericRequest<Groups[]>({
    url: `${urlBase}/GetGruposEnPeriodo/${AuthUserId()}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

export async function GetGroup(id: number) {
  if (isMockEnabled()) return GetGroupMock(id)

  return await GenericRequest<Groups>({
    url: `${urlBase}/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

export async function PostGroup(group: Groups) {
  if (isMockEnabled()) return PostGroupMock(group)

  return await GenericRequest<Groups>({
    url: `${urlBase}/PostGrupoEnPeriodo`,
    method: 'POST',
    data: {
      nombre: group.nombre,
      descripcion: group.descripcion,
      idUsuario: group.idUsuario,
    },
    authToken: AuthUser(),
  })
}

export async function PutGroup(group: Groups) {
  if (isMockEnabled()) return PutGroupMock(group)

  return await GenericRequest<Groups>({
    url: `${urlBase}/${group.id}`,
    method: 'PUT',
    data: {
      id: group.id,
      nombre: group.nombre,
      descripcion: group.descripcion,
      idUsuario: group.idUsuario,
    },
    authToken: AuthUser(),
  })
}

export async function DeleteGroup(id: number) {
  if (isMockEnabled()) return DeleteGroupMock(id)

  return await GenericRequest<Groups>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
    authToken: AuthUser(),
  })
}

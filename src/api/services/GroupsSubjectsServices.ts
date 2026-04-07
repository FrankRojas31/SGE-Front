import type { IGroupsSubjects } from '@/types/GroupsSubjects'
import type { ISubject } from '@/types/Subject'
import { GenericRequest } from '../GenericRequest'
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetGroupsSubjectsMock,
  GetGroupSubjectsMock,
  PostGroupsSubjectsMock,
  PutGroupSubjectsMock,
  DeleteGroupSubjectsMock,
  GetMateriasConGruposMock,
  GetMateriasSinGrupoMock,
} from '../mocks/GroupsSubjectsServices.mock'

const urlBase = 'MateriaGrupo'

// GET: '/MateriaGrupo'
export async function GetGroupsSubjects() {
  if (isMockEnabled()) return GetGroupsSubjectsMock()

  return await GenericRequest<IGroupsSubjects[]>({
    url: urlBase,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/MateriaGrupo'
export async function PostGroupsSubjects(groupsSubjects: IGroupsSubjects) {
  if (isMockEnabled()) return PostGroupsSubjectsMock(groupsSubjects)

  return await GenericRequest<IGroupsSubjects>({
    url: urlBase,
    method: 'POST',
    data: groupsSubjects,
    authToken: AuthUser(),
  })
}

// GET: '/MateriaGrupo/{id}'
export async function GetGroupSubjects(id: number) {
  if (isMockEnabled()) return GetGroupSubjectsMock(id)

  return await GenericRequest<IGroupsSubjects>({
    url: `${urlBase}/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// PUT: '/MateriaGrupo/{id}'
export async function PutGroupSubjects(groupsSubjects: IGroupsSubjects) {
  if (isMockEnabled()) return PutGroupSubjectsMock(groupsSubjects)

  return await GenericRequest<IGroupsSubjects>({
    url: `${urlBase}/${groupsSubjects.Id}`,
    method: 'PUT',
    data: groupsSubjects,
    authToken: AuthUser(),
  })
}

// DELETE: '/MateriaGrupo/{id}'
export async function DeleteGroupsSubjects(id: number) {
  if (isMockEnabled()) return DeleteGroupSubjectsMock(id)

  return await GenericRequest<IGroupsSubjects>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
    authToken: AuthUser(),
  })
}

// GET: '/MateriaGrupo/GetMateriaDeGrupo/{id}'
export async function GetMateriasConGrupos(id: number) {
  if (isMockEnabled()) return GetMateriasConGruposMock(id)

  return await GenericRequest<ISubject[]>({
    url: `${urlBase}/GetMateriaDeGrupo/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// GET: '/MateriaGrupo/GetMateriaNoEnGrupo/{id}'
export async function GetMateriasSinGrupo(id: number) {
  if (isMockEnabled()) return GetMateriasSinGrupoMock(id)

  return await GenericRequest<ISubject[]>({
    url: `${urlBase}/GetMateriaNoEnGrupo/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/MateriaGrupo/PostMateriaAGrupo/{id}'
export async function PostMateriasaGrupos(id: number, IdMaterias: number[]) {
  return await GenericRequest<{ success: boolean }>({
    url: `${urlBase}/PostMateriaAGrupo/${id}`,
    method: 'POST',
    data: IdMaterias,
    authToken: AuthUser(),
  })
}
export async function DeleteGroupsSubject(id: number, IdMaterias: number[]) {
  return await GenericRequest<{ success: boolean }>({
    url: `${urlBase}/DeleteMateriaAGrupo/${id}`,
    method: 'DELETE',
    data: IdMaterias,
    authToken: AuthUser(),
  })
}

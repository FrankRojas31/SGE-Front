import type { IGroupsStudent } from '@/types/GroupsStudent'
import type { IStudent } from '@/types/Students'
import { GenericRequest } from '../GenericRequest'
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetGroupsStudentMock,
  GetGroupStudentMock,
  PostGroupsStudentMock,
  PutGroupStudentMock,
  DeleteGroupStudentMock,
  GetAlumnoConGrupoMock,
  GetAlumnoSinGrupoMock,
} from '../mocks/GroupsStudentServices.mock'

const urlBase = 'GruposAlumnos'

// GET: '/GruposAlumnos'
export async function GetGroupsStudent() {
  if (isMockEnabled()) return GetGroupsStudentMock()

  return await GenericRequest<IGroupsStudent[]>({
    url: urlBase,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/GruposAlumnos'
export async function PostGroupsStudent(groupStudent: IGroupsStudent) {
  if (isMockEnabled()) return PostGroupsStudentMock(groupStudent)

  return await GenericRequest<IGroupsStudent>({
    url: urlBase,
    method: 'POST',
    data: {
      nombre: groupStudent.nombre,
      descripcion: groupStudent.descripcion,
      idGrupo: groupStudent.idGrupo,
      idAlumno: groupStudent.idAlumno,
    },
    authToken: AuthUser(),
  })
}

// GET: '/GruposAlumnos/{id}'
export async function GetGroupStudent(id: number) {
  if (isMockEnabled()) return GetGroupStudentMock(id)

  return await GenericRequest<IGroupsStudent>({
    url: `${urlBase}/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// PUT: '/GruposAlumnos/{id}'
export async function PutGroupStudent(groupStudent: IGroupsStudent) {
  if (isMockEnabled()) return PutGroupStudentMock(groupStudent)

  return await GenericRequest<IGroupsStudent>({
    url: `${urlBase}/${groupStudent.id}`,
    method: 'PUT',
    data: {
      id: groupStudent.id,
      nombre: groupStudent.nombre,
      descripcion: groupStudent.descripcion,
      idGrupo: groupStudent.idGrupo,
      idAlumno: groupStudent.idAlumno,
    },
    authToken: AuthUser(),
  })
}

// DELETE: '/GruposAlumnos/{id}'
export async function DeleteGroupsStudent(id: number, IdStudents: number[]) {
  if (isMockEnabled()) return DeleteGroupStudentMock(id)

  return await GenericRequest<IGroupsStudent>({
    url: `${urlBase}/DeleteAlumnosEnGrupo/${id}`,
    method: 'DELETE',
    data: { ids: IdStudents } as any,
    authToken: AuthUser(),
  })
}

// GET: '/GruposAlumnos/GetAlumnoSinGrupo'
export async function GetAlumnoSinGrupo() {
  if (isMockEnabled()) return GetAlumnoSinGrupoMock()

  return await GenericRequest<IStudent[]>({
    url: `${urlBase}/GetAlumnosSinGrupo`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// GET: '/GruposAlumnos/GetAlumnoConGrupo'
export async function GetAlumnoConGrupo(id: number) {
  if (isMockEnabled()) return GetAlumnoConGrupoMock(id)

  return await GenericRequest<IStudent[]>({
    url: `${urlBase}/GetAlumnosConGrupo/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/GruposAlumnos/PostAlumnosaGrupo/{id}'
export async function PostAlumnosaGrupo(id: number, idAlumnos: number[]) {
  return await GenericRequest<{ success: boolean }>({
    url: `${urlBase}/PostAlumnosaGrupo/${id}`,
    method: 'POST',
    data: { ids: idAlumnos } as any,
    authToken: AuthUser(),
  })
}

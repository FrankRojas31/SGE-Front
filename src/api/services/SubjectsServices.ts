import type { ISubject } from '@/types/Subject'
import type { Units } from '@/types/Unit'
import { GenericRequest } from '../GenericRequest'
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetSubjectsMock,
  GetSubjectMock,
  PostSubjectMock,
  PutSubjectMock,
  DeleteSubjectMock,
  GetUnitsForSubjectMock,
} from '../mocks/SubjectsServices.mock'

const urlBase = 'Materias'

// GET: 'GET /Materias/GetUnidadesDeMateria/'
export async function GetUnitsForSubject(id: number) {
  if (isMockEnabled()) return GetUnitsForSubjectMock(id)

  return await GenericRequest<Units[]>({
    url: `${urlBase}/GetUnidadesDeMateria/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// GET: '/Materias'
export async function GetSubjects() {
  if (isMockEnabled()) return GetSubjectsMock()

  return await GenericRequest<ISubject[]>({
    url: `${urlBase}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/Materias/{
//    data
// }'
export async function PostSubject(subject: ISubject) {
  if (isMockEnabled()) return PostSubjectMock(subject)

  return await GenericRequest<ISubject>({
    url: urlBase,
    method: 'POST',
    data: {
      nombre: subject.nombre,
      descripcion: subject.descripcion,
    },
    authToken: AuthUser(),
  })
}

// GET: '/Materias/5
export async function GetSubject(id: number) {
  if (isMockEnabled()) return GetSubjectMock(id)

  return await GenericRequest<ISubject>({
    url: `${urlBase}/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

//PUT: '/Materias/5
export async function PutSubject(subject: ISubject) {
  if (isMockEnabled()) return PutSubjectMock(subject)

  return await GenericRequest<ISubject>({
    url: `${urlBase}/${subject.id}`,
    method: 'PUT',
    data: {
      id: subject.id,
      nombre: subject.nombre,
      descripcion: subject.descripcion,
    },
    authToken: AuthUser(),
  })
}

//DELETE: '/Materias/5'
export async function DeleteSubject(id: number) {
  if (isMockEnabled()) return DeleteSubjectMock(id)

  return await GenericRequest<ISubject>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
    authToken: AuthUser(),
  })
}

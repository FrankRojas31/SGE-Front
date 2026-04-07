import type { ISchoolYear } from '@/types/SchoolYear'
import { GenericRequest } from '../GenericRequest'
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetSchoolYearsMock,
  GetSchoolYearMock,
  PostSchoolYearMock,
  PutSchoolYearMock,
  DeleteSchoolYearMock,
} from '../mocks/SchoolYearServices.mock'

const urlBase = 'CursoEscolar'

// GET: '/CursoEscolar'
export async function GetSchoolYears() {
  if (isMockEnabled()) return GetSchoolYearsMock()

  return await GenericRequest<ISchoolYear[]>({
    url: `${urlBase}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/CursoEscolar/{
//    data
// }'
export async function PostSchoolYear(schoolYear: ISchoolYear) {
  if (isMockEnabled()) return PostSchoolYearMock(schoolYear)

  return await GenericRequest<ISchoolYear>({
    url: urlBase,
    method: 'POST',
    data: {
      schoolYear,
    },
    authToken: AuthUser(),
  })
}

// GET: '/CursoEscolar/5
export async function GetSchoolYear(id: number) {
  if (isMockEnabled()) return GetSchoolYearMock(id)

  return await GenericRequest<ISchoolYear>({
    url: `${urlBase}/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

//PUT: '/CursoEscolar/5
export async function PutSchoolYear(schoolYear: ISchoolYear) {
  if (isMockEnabled()) return PutSchoolYearMock(schoolYear)

  return await GenericRequest<ISchoolYear>({
    url: `${urlBase}/${schoolYear.id}`,
    method: 'PUT',
    authToken: AuthUser(),
  })
}

//DELETE: '/CursoEscolar/5'
export async function DeleteSchoolYear(id: number) {
  if (isMockEnabled()) return DeleteSchoolYearMock(id)

  return await GenericRequest<ISchoolYear>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
    authToken: AuthUser(),
  })
}

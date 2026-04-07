import type { ICalifications } from '@/types/Califications'
import { GenericRequest } from '../GenericRequest'
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetCalificationsMock,
  GetCalificationMock,
  PostCalificationMock,
  PutCalificationMock,
  DeleteCalificationMock,
} from '../mocks/CalificationService.mock'

const urlBase = 'Calificaciones'

// GET: '/api/ICalifications'
export async function GetCalifications() {
  if (isMockEnabled()) return GetCalificationsMock()

  return await GenericRequest<ICalifications[]>({
    url: `${urlBase}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/api/ICalifications'
export async function PostCalification(calificacion: ICalifications) {
  if (isMockEnabled()) return PostCalificationMock(calificacion)

  return await GenericRequest<ICalifications>({
    url: urlBase,
    method: 'POST',
    data: {
      id: calificacion.id,
      calificacion: calificacion.calificacion,
      idAlumno: calificacion.idAlumno,
      idUnidad: calificacion.idUnidad,
    },
    authToken: AuthUser(),
  })
}

// GET: '/api/ICalifications/{id}'
export async function GetCalification(id: number) {
  if (isMockEnabled()) return GetCalificationMock(id)

  return await GenericRequest<ICalifications>({
    url: `${urlBase}/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// PUT: '/api/ICalifications/{id}'
export async function PutCalification(calificacion: ICalifications) {
  if (isMockEnabled()) return PutCalificationMock(calificacion)

  return await GenericRequest<ICalifications>({
    url: `${urlBase}/${calificacion.id}`,
    method: 'PUT',
    data: {
      id: calificacion.id,
      calificacion: calificacion.calificacion,
      idAlumno: calificacion.idAlumno,
      idUnidad: calificacion.idUnidad,
    },
    authToken: AuthUser(),
  })
}

// DELETE: '/api/ICalifications/{id}'
export async function DeleteCalification(id: number) {
  if (isMockEnabled()) return DeleteCalificationMock(id)

  return await GenericRequest<ICalifications>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
    authToken: AuthUser(),
  })
}

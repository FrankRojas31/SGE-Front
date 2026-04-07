import type { IPeriods } from '@/types/Periods'
import { GenericRequest } from '../GenericRequest'
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetPeriodsMock,
  GetPeriodMock,
  PostPeriodMock,
  PutPeriodMock,
  DeletePeriodMock,
} from '../mocks/PeriodsServices.mock'

const urlBase = 'Periodos'

// GET: '/Periodos'
export async function GetPeriods() {
  if (isMockEnabled()) return GetPeriodsMock()

  return await GenericRequest<IPeriods[]>({
    url: `${urlBase}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// GET: '/GetPeriodoActivo'
export async function GetPeriodActive() {
  if (isMockEnabled()) {
    const periods = await GetPeriodsMock()
    if (periods?.data) {
      const activePeriod = periods.data.find((p) => p.estatusPeriodo === 'ACTIVO')
      return { ...periods, data: activePeriod || periods.data[0] }
    }
  }

  return await GenericRequest<IPeriods>({
    url: `${urlBase}/GetPeriodoActivo`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/Periodos/{
//    data
// }'
export async function PostPeriod(period: IPeriods) {
  if (isMockEnabled()) return PostPeriodMock(period)

  return await GenericRequest<IPeriods>({
    url: `${urlBase}/PostPeriodo`,
    method: 'POST',
    data: {
      nombre: period.nombre,
      descripcion: period.descripcion,
      fechaInicio: period.fechaInicio,
      fechaFin: period.fechaFin,
      estatusPeriodo: period.estatusPeriodo,
    },
    authToken: AuthUser(),
  })
}

//GET: '/Periodos/{id}
export async function GetPeriod(id: number) {
  if (isMockEnabled()) return GetPeriodMock(id)

  return await GenericRequest<IPeriods>({
    url: `${urlBase}/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

//PUT: '/Periodos/{id}

export async function PutPeriod(period: IPeriods) {
  if (isMockEnabled()) return PutPeriodMock(period)

  return await GenericRequest<IPeriods>({
    url: `${urlBase}/PutPeriodo`,
    method: 'PUT',
    data: {
      id: period.id,
      nombre: period.nombre,
      descripcion: period.descripcion,
      fechaInicio: period.fechaInicio,
      fechaFin: period.fechaFin,
      estatusPeriodo: period.estatusPeriodo,
    },
    authToken: AuthUser(),
  })
}

//DELETE: '/Periodos/{id}
export async function DeletePeriod(id: number) {
  if (isMockEnabled()) return DeletePeriodMock(id)

  return await GenericRequest<IPeriods>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
    authToken: AuthUser(),
  })
}

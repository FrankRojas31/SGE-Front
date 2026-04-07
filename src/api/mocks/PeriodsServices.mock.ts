import type { IPeriods } from '@/types/Periods'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Periods
const mockPeriodsData: IPeriods[] = [
  {
    id: 1,
    nombre: 'Primer Trimestre',
    descripcion: 'Periodo del 1 de septiembre al 30 de noviembre',
    fechaInicio: new Date('2024-09-01'),
    fechaFin: new Date('2024-11-30'),
    estatusPeriodo: 'FINALIZADO',
  },
  {
    id: 2,
    nombre: 'Segundo Trimestre',
    descripcion: 'Periodo del 1 de diciembre al 28 de febrero',
    fechaInicio: new Date('2024-12-01'),
    fechaFin: new Date('2025-02-28'),
    estatusPeriodo: 'ACTIVO',
  },
  {
    id: 3,
    nombre: 'Tercer Trimestre',
    descripcion: 'Periodo del 1 de marzo al 31 de mayo',
    fechaInicio: new Date('2025-03-01'),
    fechaFin: new Date('2025-05-31'),
    estatusPeriodo: 'EN_ESPERA',
  },
  {
    id: 4,
    nombre: 'Período de Evaluación Final',
    descripcion: 'Periodo de evaluaciones finales',
    fechaInicio: new Date('2025-06-01'),
    fechaFin: new Date('2025-06-15'),
    estatusPeriodo: 'EN_ESPERA',
  },
]

export async function GetPeriodsMock(): Promise<ResponseHelper<IPeriods[]>> {
  return mockResponse(mockPeriodsData)
}

export async function GetPeriodMock(id: number): Promise<ResponseHelper<IPeriods>> {
  const period = mockPeriodsData.find((p) => p.id === id)
  return mockResponse(period || null)
}

export async function PostPeriodMock(period: IPeriods): Promise<ResponseHelper<IPeriods>> {
  const newPeriod: IPeriods = {
    ...period,
    id: Math.max(...mockPeriodsData.map((p) => p.id), 0) + 1,
  }
  mockPeriodsData.push(newPeriod)
  return mockResponse(newPeriod)
}

export async function PutPeriodMock(period: IPeriods): Promise<ResponseHelper<IPeriods>> {
  const index = mockPeriodsData.findIndex((p) => p.id === period.id)
  if (index >= 0) {
    mockPeriodsData[index] = period
    return mockResponse(period)
  }
  return mockResponse(null)
}

export async function DeletePeriodMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockPeriodsData.findIndex((p) => p.id === id)
  if (index >= 0) {
    mockPeriodsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

import type { ICalifications } from '@/types/Califications'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Califications
const mockCalificationsData: ICalifications[] = [
  {
    id: 1,
    calificacion: 95,
    idAlumno: 1,
    idUnidad: 1,
  },
  {
    id: 2,
    calificacion: 87,
    idAlumno: 1,
    idUnidad: 2,
  },
  {
    id: 3,
    calificacion: 92,
    idAlumno: 2,
    idUnidad: 1,
  },
  {
    id: 4,
    calificacion: 78,
    idAlumno: 2,
    idUnidad: 2,
  },
  {
    id: 5,
    calificacion: 88,
    idAlumno: 3,
    idUnidad: 1,
  },
  {
    id: 6,
    calificacion: 91,
    idAlumno: 3,
    idUnidad: 2,
  },
  {
    id: 7,
    calificacion: 85,
    idAlumno: 4,
    idUnidad: 1,
  },
  {
    id: 8,
    calificacion: 89,
    idAlumno: 4,
    idUnidad: 2,
  },
]

export async function GetCalificationsMock(): Promise<ResponseHelper<ICalifications[]>> {
  return mockResponse(mockCalificationsData)
}

export async function GetCalificationMock(id: number): Promise<ResponseHelper<ICalifications>> {
  const calification = mockCalificationsData.find((c) => c.id === id)
  return mockResponse(calification || null) as any
}

export async function PostCalificationMock(
  calification: ICalifications,
): Promise<ResponseHelper<ICalifications>> {
  const newCalification: ICalifications = {
    ...calification,
    id: Math.max(...mockCalificationsData.map((c) => c.id), 0) + 1,
  }
  mockCalificationsData.push(newCalification)
  return mockResponse(newCalification)
}

export async function PutCalificationMock(
  calification: ICalifications,
): Promise<ResponseHelper<ICalifications>> {
  const index = mockCalificationsData.findIndex((c) => c.id === calification.id)
  if (index >= 0) {
    mockCalificationsData[index] = calification
    return mockResponse(calification)
  }
  return mockResponse(null) as any
}

export async function DeleteCalificationMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockCalificationsData.findIndex((c) => c.id === id)
  if (index >= 0) {
    mockCalificationsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(null) as any
}

import type { ISchoolYear } from '@/types/SchoolYear'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para SchoolYear
const mockSchoolYearsData: ISchoolYear[] = [
  {
    id: 1,
    nombre: '2023-2024',
    descripcion: 'Año escolar 2023-2024',
    esBorrado: false,
  },
  {
    id: 2,
    nombre: '2024-2025',
    descripcion: 'Año escolar 2024-2025 - Actual',
    esBorrado: false,
  },
  {
    id: 3,
    nombre: '2025-2026',
    descripcion: 'Año escolar 2025-2026',
    esBorrado: false,
  },
  {
    id: 4,
    nombre: '2022-2023',
    descripcion: 'Año escolar 2022-2023',
    esBorrado: false,
  },
]

export async function GetSchoolYearsMock(): Promise<ResponseHelper<ISchoolYear[]>> {
  return mockResponse(mockSchoolYearsData)
}

export async function GetSchoolYearMock(id: number): Promise<ResponseHelper<ISchoolYear>> {
  const schoolYear = mockSchoolYearsData.find((sy) => sy.id === id)
  return mockResponse(schoolYear || null) as any
}

export async function PostSchoolYearMock(
  schoolYear: ISchoolYear,
): Promise<ResponseHelper<ISchoolYear>> {
  const newSchoolYear: ISchoolYear = {
    ...schoolYear,
    id: Math.max(...mockSchoolYearsData.map((sy) => sy.id), 0) + 1,
  }
  mockSchoolYearsData.push(newSchoolYear)
  return mockResponse(newSchoolYear)
}

export async function PutSchoolYearMock(
  schoolYear: ISchoolYear,
): Promise<ResponseHelper<ISchoolYear>> {
  const index = mockSchoolYearsData.findIndex((sy) => sy.id === schoolYear.id)
  if (index >= 0) {
    mockSchoolYearsData[index] = schoolYear
    return mockResponse(schoolYear)
  }
  return mockResponse(null) as any
}

export async function DeleteSchoolYearMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockSchoolYearsData.findIndex((sy) => sy.id === id)
  if (index >= 0) {
    mockSchoolYearsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

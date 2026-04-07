import type { Units } from '@/types/Unit'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Units
const mockUnitsData: Units[] = [
  {
    id: 1,
    nombre: 'Unidad 1: Números Naturales',
    descripcion: 'Introducción a los números naturales, operaciones básicas',
    idMateria: 1, // Matemáticas
  },
  {
    id: 2,
    nombre: 'Unidad 2: Números Enteros',
    descripcion: 'Números enteros positivos y negativos, operaciones',
    idMateria: 1, // Matemáticas
  },
  {
    id: 3,
    nombre: 'Unidad 3: Fracciones',
    descripcion: 'Concepto de fracciones, equivalencia y operaciones',
    idMateria: 1, // Matemáticas
  },
  {
    id: 4,
    nombre: 'Unidad 1: Gramática Española',
    descripcion: 'Partes del discurso, oraciones y estructuras básicas',
    idMateria: 2, // Lengua Española
  },
  {
    id: 5,
    nombre: 'Unidad 2: Literatura Española',
    descripcion: 'Autores y obras importantes de la literatura española',
    idMateria: 2, // Lengua Española
  },
  {
    id: 6,
    nombre: 'Unidad 1: Células y Tejidos',
    descripcion: 'Estructura y función de células, tipos de tejidos',
    idMateria: 3, // Ciencias Naturales
  },
  {
    id: 7,
    nombre: 'Unidad 2: Sistemas del Cuerpo Humano',
    descripcion: 'Aparatos y sistemas del cuerpo humano',
    idMateria: 3, // Ciencias Naturales
  },
]

// Mock data para relación grupos-materias
const mockGroupsSubjectsData = [
  { idGrupo: 1, idMateria: 1 },
  { idGrupo: 1, idMateria: 2 },
  { idGrupo: 1, idMateria: 3 },
  { idGrupo: 1, idMateria: 4 },
  { idGrupo: 1, idMateria: 5 },
  { idGrupo: 2, idMateria: 1 },
  { idGrupo: 2, idMateria: 2 },
  { idGrupo: 3, idMateria: 1 },
  { idGrupo: 3, idMateria: 2 },
  { idGrupo: 3, idMateria: 3 },
]

export async function GetUnitsMock(groupId?: number): Promise<ResponseHelper<Units[]>> {
  if (!groupId) {
    return mockResponse(mockUnitsData)
  }

  // Obtener las materias del grupo
  const subjectsOfGroup = mockGroupsSubjectsData
    .filter((gs) => gs.idGrupo === groupId)
    .map((gs) => gs.idMateria)

  // Devolver las unidades de esas materias
  const unitsOfGroup = mockUnitsData.filter((unit) => subjectsOfGroup.includes(unit.idMateria))
  return mockResponse(unitsOfGroup)
}

export async function GetUnitMock(id: number): Promise<ResponseHelper<Units>> {
  const unit = mockUnitsData.find((u) => u.id === id)
  return mockResponse(unit || null)
}

export async function PostUnitMock(unit: Units): Promise<ResponseHelper<Units>> {
  const newUnit: Units = {
    ...unit,
    id: Math.max(...mockUnitsData.map((u) => u.id), 0) + 1,
  }
  mockUnitsData.push(newUnit)
  return mockResponse(newUnit)
}

export async function PutUnitMock(unit: Units): Promise<ResponseHelper<Units>> {
  const index = mockUnitsData.findIndex((u) => u.id === unit.id)
  if (index >= 0) {
    mockUnitsData[index] = unit
    return mockResponse(unit)
  }
  return mockResponse(null)
}

export async function DeleteUnitMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockUnitsData.findIndex((u) => u.id === id)
  if (index >= 0) {
    mockUnitsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

import type { Groups } from '@/types/Groups'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Groups
const mockGroupsData: Groups[] = [
  {
    id: 1,
    nombre: 'Grupo A - 1º Primaria',
    descripcion: 'Grupo de primer año de primaria, sección A',
    idUsuario: 'teacher1',
  },
  {
    id: 2,
    nombre: 'Grupo B - 1º Primaria',
    descripcion: 'Grupo de primer año de primaria, sección B',
    idUsuario: 'teacher1',
  },
  {
    id: 3,
    nombre: 'Grupo A - 2º Primaria',
    descripcion: 'Grupo de segundo año de primaria, sección A',
    idUsuario: 'teacher2',
  },
  {
    id: 4,
    nombre: 'Grupo B - 2º Primaria',
    descripcion: 'Grupo de segundo año de primaria, sección B',
    idUsuario: 'teacher2',
  },
  {
    id: 5,
    nombre: 'Grupo A - 3º Primaria',
    descripcion: 'Grupo de tercer año de primaria, sección A',
    idUsuario: 'teacher3',
  },
]

export async function GetGroupsMock(): Promise<ResponseHelper<Groups[]>> {
  return mockResponse(mockGroupsData)
}

export async function GetGroupsInPeriodActiveMock(): Promise<ResponseHelper<Groups[]>> {
  // Retorna solo los grupos del usuario actual (simulado)
  const userGroups = mockGroupsData.slice(0, 2)
  return mockResponse(userGroups)
}

export async function GetGroupMock(id: number): Promise<ResponseHelper<Groups>> {
  const group = mockGroupsData.find((g) => g.id === id)
  return mockResponse(group || null) as any
}

export async function PostGroupMock(group: Groups): Promise<ResponseHelper<Groups>> {
  const newGroup: Groups = {
    id: Math.max(...mockGroupsData.map((g) => g.id), 0) + 1,
    nombre: group.nombre,
    descripcion: group.descripcion,
    idUsuario: group.idUsuario,
  }
  mockGroupsData.push(newGroup)
  return mockResponse(newGroup)
}

export async function PutGroupMock(group: Groups): Promise<ResponseHelper<Groups>> {
  const index = mockGroupsData.findIndex((g) => g.id === group.id)
  if (index >= 0) {
    mockGroupsData[index] = group
    return mockResponse(group)
  }
  return mockResponse(null) as any
}

export async function DeleteGroupMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockGroupsData.findIndex((g) => g.id === id)
  if (index >= 0) {
    mockGroupsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(null) as any
}

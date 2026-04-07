import type { IUser } from '@/types/Users'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Users
const mockUsersData: IUser[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@escuela.com',
    password: 'password123',
    confirmPassword: 'password123',
    rol: 'ADMIN',
    estatusUsuario: 'ACTIVO',
    idPersona: 1,
  },
  {
    id: 2,
    name: 'Profesor 1',
    email: 'profesor1@escuela.com',
    password: 'password123',
    confirmPassword: 'password123',
    rol: 'PROFESOR',
    estatusUsuario: 'ACTIVO',
    idPersona: 2,
  },
  {
    id: 3,
    name: 'Profesor 2',
    email: 'profesor2@escuela.com',
    password: 'password123',
    confirmPassword: 'password123',
    rol: 'PROFESOR',
    estatusUsuario: 'ACTIVO',
    idPersona: 3,
  },
  {
    id: 4,
    name: 'Coordinador',
    email: 'coordinador@escuela.com',
    password: 'password123',
    confirmPassword: 'password123',
    rol: 'COORDINADOR',
    estatusUsuario: 'ACTIVO',
    idPersona: 4,
  },
  {
    id: 5,
    name: 'Tutor',
    email: 'tutor@escuela.com',
    password: 'password123',
    confirmPassword: 'password123',
    rol: 'TUTOR',
    estatusUsuario: 'ACTIVO',
    idPersona: 5,
  },
]

export async function GetUsersMock(): Promise<ResponseHelper<IUser[]>> {
  return mockResponse(mockUsersData)
}

export async function GetUserMock(id: number): Promise<ResponseHelper<IUser>> {
  const user = mockUsersData.find((u) => u.id === id)
  return mockResponse(user || null) as any
}

export async function PostUserMock(user: IUser): Promise<ResponseHelper<IUser>> {
  const newUser: IUser = {
    ...user,
    id: Math.max(...mockUsersData.map((u) => u.id), 0) + 1,
  }
  mockUsersData.push(newUser)
  return mockResponse(newUser)
}

export async function PutUserMock(user: IUser): Promise<ResponseHelper<IUser>> {
  const index = mockUsersData.findIndex((u) => u.id === user.id)
  if (index >= 0) {
    mockUsersData[index] = user
    return mockResponse(user)
  }
  return mockResponse(null) as any
}

export async function DeleteUserMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockUsersData.findIndex((u) => u.id === id)
  if (index >= 0) {
    mockUsersData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

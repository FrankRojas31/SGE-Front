import type { IAuthUser, ILoginUser, IRegisterUser } from '@/types/Auth/Users'
import { mockResponse, mockErrorResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'
import type { IUser } from '@/types/Users'

// Datos simulados para usuarios
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

export async function LoginAuthMock(userLogin: ILoginUser): Promise<ResponseHelper<IAuthUser>> {
  // Buscar usuario por email
  const user = mockUsersData.find((u) => u.email === userLogin.email)

  if (!user) {
    return mockErrorResponse<IAuthUser>('Email o contraseña incorrectos')
  }

  // Validar contraseña
  if (user.password !== userLogin.password) {
    return mockErrorResponse<IAuthUser>('Email o contraseña incorrectos')
  }

  // Generar tokens simulados
  const authUser: IAuthUser = {
    id: user.id.toString(),
    email: user.email,
    username: user.name,
    role: user.rol,
    accessToken: 'mock-access-token-' + user.id,
    refreshToken: 'mock-refresh-token-' + user.id,
    accessTokenExpiration: new Date(Date.now() + 3600000).toISOString(), // 1 hora
  }

  return mockResponse(authUser)
}

export async function RegisterAuthMock(
  userRegister: IRegisterUser,
): Promise<ResponseHelper<IRegisterUser>> {
  // Verificar si el email ya existe
  const existingUser = mockUsersData.find((u) => u.email === userRegister.email)

  if (existingUser) {
    return mockErrorResponse<IRegisterUser>('El email ya está registrado')
  }

  // Crear nuevo usuario
  const newUser: IUser = {
    id: Math.max(...mockUsersData.map((u) => u.id), 0) + 1,
    name: userRegister.name,
    email: userRegister.email,
    password: userRegister.password,
    confirmPassword: userRegister.confirmPassword,
    rol: userRegister.rol || 'USER',
    estatusUsuario: userRegister.estatusUsuario || 'ACTIVO',
    idPersona: Math.max(...mockUsersData.map((u) => u.idPersona), 0) + 1,
  }

  mockUsersData.push(newUser)

  return mockResponse(userRegister)
}

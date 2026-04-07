import type { IStudent } from '@/types/Students'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Students
const mockStudentsData: IStudent[] = [
  {
    id: 1,
    nombreCompleto: 'Juan García López',
    matricula: 20241001,
    fechaIngreso: new Date('2024-01-15'),
    cursoEscolar: '2024-2025',
    idPersona: 101,
    idCursoEscolar: 1,
    necesidadesEspeciales: 'Ninguna',
    contactoEmergencia: '1234567890',
  },
  {
    id: 2,
    nombreCompleto: 'María Rodríguez Pérez',
    matricula: 20241002,
    fechaIngreso: new Date('2024-01-15'),
    cursoEscolar: '2024-2025',
    idPersona: 102,
    idCursoEscolar: 1,
    necesidadesEspeciales: 'Ninguna',
    contactoEmergencia: '0987654321',
  },
  {
    id: 3,
    nombreCompleto: 'Carlos Martínez Gómez',
    matricula: 20241003,
    fechaIngreso: new Date('2024-01-15'),
    cursoEscolar: '2024-2025',
    idPersona: 103,
    idCursoEscolar: 1,
    necesidadesEspeciales: 'Discapacidad auditiva parcial',
    contactoEmergencia: '5555555555',
  },
  {
    id: 4,
    nombreCompleto: 'Ana Fernández Sánchez',
    matricula: 20241004,
    fechaIngreso: new Date('2024-01-15'),
    cursoEscolar: '2024-2025',
    idPersona: 104,
    idCursoEscolar: 2,
    necesidadesEspeciales: 'Ninguna',
    contactoEmergencia: '4444444444',
  },
  {
    id: 5,
    nombreCompleto: 'Pedro López Jiménez',
    matricula: 20241005,
    fechaIngreso: new Date('2024-01-15'),
    cursoEscolar: '2024-2025',
    idPersona: 105,
    idCursoEscolar: 2,
    necesidadesEspeciales: 'Ninguna',
    contactoEmergencia: '3333333333',
  },
]

export async function GetStudentsMock(): Promise<ResponseHelper<IStudent[]>> {
  return mockResponse(mockStudentsData)
}

export async function GetStudentMock(id: number): Promise<ResponseHelper<IStudent>> {
  const student = mockStudentsData.find((s) => s.id === id)
  return mockResponse(student || null) as any
}

export async function PostStudentMock(student: IStudent): Promise<ResponseHelper<IStudent>> {
  const newStudent: IStudent = {
    ...student,
    id: Math.max(...mockStudentsData.map((s) => s.id), 0) + 1,
  }
  mockStudentsData.push(newStudent)
  return mockResponse(newStudent)
}

export async function PutStudentMock(student: IStudent): Promise<ResponseHelper<IStudent>> {
  const index = mockStudentsData.findIndex((s) => s.id === student.id)
  if (index >= 0) {
    mockStudentsData[index] = student
    return mockResponse(student)
  }
  return mockResponse(null) as any
}

export async function DeleteStudentMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockStudentsData.findIndex((s) => s.id === id)
  if (index >= 0) {
    mockStudentsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

import type { IGroupsStudent } from '@/types/GroupsStudent'
import type { IStudent } from '@/types/Students'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para GroupsStudent
const mockGroupsStudentData: IGroupsStudent[] = [
  {
    id: 1,
    nombre: 'Juan García - Grupo A 1º Primaria',
    descripcion: 'Asignación de estudiante a grupo',
    idGrupo: 1,
    idAlumno: 1,
  },
  {
    id: 2,
    nombre: 'María Rodríguez - Grupo A 1º Primaria',
    descripcion: 'Asignación de estudiante a grupo',
    idGrupo: 1,
    idAlumno: 2,
  },
  {
    id: 3,
    nombre: 'Carlos Martínez - Grupo A 1º Primaria',
    descripcion: 'Asignación de estudiante a grupo',
    idGrupo: 1,
    idAlumno: 3,
  },
  {
    id: 4,
    nombre: 'Ana Fernández - Grupo A 2º Primaria',
    descripcion: 'Asignación de estudiante a grupo',
    idGrupo: 3,
    idAlumno: 4,
  },
  {
    id: 5,
    nombre: 'Pedro López - Grupo A 2º Primaria',
    descripcion: 'Asignación de estudiante a grupo',
    idGrupo: 3,
    idAlumno: 5,
  },
]

// Datos de estudiantes completos para devolver en GetAlumnoConGrupo y GetAlumnoSinGrupo
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

export async function GetGroupsStudentMock(): Promise<ResponseHelper<IGroupsStudent[]>> {
  return mockResponse(mockGroupsStudentData)
}

export async function GetGroupStudentMock(id: number): Promise<ResponseHelper<IGroupsStudent>> {
  const groupStudent = mockGroupsStudentData.find((gs) => gs.id === id)
  return mockResponse(groupStudent || null)
}

export async function PostGroupsStudentMock(
  groupStudent: IGroupsStudent,
): Promise<ResponseHelper<IGroupsStudent>> {
  const newGroupStudent: IGroupsStudent = {
    ...groupStudent,
    id: Math.max(...mockGroupsStudentData.map((gs) => gs.id), 0) + 1,
  }
  mockGroupsStudentData.push(newGroupStudent)
  return mockResponse(newGroupStudent)
}

export async function PutGroupStudentMock(
  groupStudent: IGroupsStudent,
): Promise<ResponseHelper<IGroupsStudent>> {
  const index = mockGroupsStudentData.findIndex((gs) => gs.id === groupStudent.id)
  if (index >= 0) {
    mockGroupsStudentData[index] = groupStudent
    return mockResponse(groupStudent)
  }
  return mockResponse(null)
}

export async function DeleteGroupStudentMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockGroupsStudentData.findIndex((gs) => gs.id === id)
  if (index >= 0) {
    mockGroupsStudentData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

// Devuelve alumnos de un grupo específico (como IStudent[])
export async function GetAlumnoConGrupoMock(id: number): Promise<ResponseHelper<IStudent[]>> {
  const alumnosDelGrupo = mockGroupsStudentData
    .filter((gs) => gs.idGrupo === id)
    .map((gs) => mockStudentsData.find((s) => s.id === gs.idAlumno))
    .filter((s) => s !== undefined) as IStudent[]
  return mockResponse(alumnosDelGrupo)
}

// Devuelve alumnos sin grupo asignado (como IStudent[])
export async function GetAlumnoSinGrupoMock(): Promise<ResponseHelper<IStudent[]>> {
  const alumnosConGrupo = new Set(mockGroupsStudentData.map((gs) => gs.idAlumno))
  const alumnosSinGrupo = mockStudentsData.filter((s) => !alumnosConGrupo.has(s.id))
  return mockResponse(alumnosSinGrupo)
}

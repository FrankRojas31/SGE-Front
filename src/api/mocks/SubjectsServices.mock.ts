import type { ISubject } from '@/types/Subject'
import type { Units } from '@/types/Unit'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Subjects
const mockSubjectsData: ISubject[] = [
  {
    id: 1,
    nombre: 'Matemáticas',
    descripcion: 'Asignatura de matemáticas, álgebra y geometría',
  },
  {
    id: 2,
    nombre: 'Lengua Española',
    descripcion: 'Asignatura de lengua, gramática y literatura',
  },
  {
    id: 3,
    nombre: 'Ciencias Naturales',
    descripcion: 'Asignatura de biología, química y física',
  },
  {
    id: 4,
    nombre: 'Historia',
    descripcion: 'Asignatura de historia universal y nacional',
  },
  {
    id: 5,
    nombre: 'Educación Física',
    descripcion: 'Asignatura de educación física y deportes',
  },
  {
    id: 6,
    nombre: 'Inglés',
    descripcion: 'Asignatura de idioma inglés',
  },
  {
    id: 7,
    nombre: 'Educación Artística',
    descripcion: 'Asignatura de artes plásticas y música',
  },
  {
    id: 8,
    nombre: 'Informática',
    descripcion: 'Asignatura de tecnología e informática',
  },
]

export async function GetSubjectsMock(): Promise<ResponseHelper<ISubject[]>> {
  return mockResponse(mockSubjectsData)
}

export async function GetSubjectMock(id: number): Promise<ResponseHelper<ISubject>> {
  const subject = mockSubjectsData.find((s) => s.id === id)
  return mockResponse(subject || null)
}

export async function PostSubjectMock(subject: ISubject): Promise<ResponseHelper<ISubject>> {
  const newSubject: ISubject = {
    id: Math.max(...mockSubjectsData.map((s) => s.id), 0) + 1,
    nombre: subject.nombre,
    descripcion: subject.descripcion,
  }
  mockSubjectsData.push(newSubject)
  return mockResponse(newSubject)
}

export async function PutSubjectMock(subject: ISubject): Promise<ResponseHelper<ISubject>> {
  const index = mockSubjectsData.findIndex((s) => s.id === subject.id)
  if (index >= 0) {
    mockSubjectsData[index] = subject
    return mockResponse(subject)
  }
  return mockResponse(null)
}

export async function DeleteSubjectMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockSubjectsData.findIndex((s) => s.id === id)
  if (index >= 0) {
    mockSubjectsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

// Devuelve unidades de una materia específica
export async function GetUnitsForSubjectMock(id: number): Promise<ResponseHelper<Units[]>> {
  // Obtener las unidades relacionadas con esta materia desde unitService.mock
  // Para simplificar, creamos una lista de unidades por materia
  const unitsBySubject: { [key: number]: Units[] } = {
    1: [
      // Matemáticas
      {
        id: 1,
        nombre: 'Unidad 1: Números Naturales',
        descripcion: 'Introducción a los números naturales, operaciones básicas',
        idMateria: 1,
      },
      {
        id: 2,
        nombre: 'Unidad 2: Números Enteros',
        descripcion: 'Números enteros positivos y negativos, operaciones',
        idMateria: 1,
      },
      {
        id: 3,
        nombre: 'Unidad 3: Fracciones',
        descripcion: 'Concepto de fracciones, equivalencia y operaciones',
        idMateria: 1,
      },
    ],
    2: [
      // Lengua Española
      {
        id: 4,
        nombre: 'Unidad 1: Gramática Española',
        descripcion: 'Partes del discurso, oraciones y estructuras básicas',
        idMateria: 2,
      },
      {
        id: 5,
        nombre: 'Unidad 2: Literatura Española',
        descripcion: 'Autores y obras importantes de la literatura española',
        idMateria: 2,
      },
    ],
    3: [
      // Ciencias Naturales
      {
        id: 6,
        nombre: 'Unidad 1: Células y Tejidos',
        descripcion: 'Estructura y función de células, tipos de tejidos',
        idMateria: 3,
      },
      {
        id: 7,
        nombre: 'Unidad 2: Sistemas del Cuerpo Humano',
        descripcion: 'Aparatos y sistemas del cuerpo humano',
        idMateria: 3,
      },
    ],
  }

  const units = unitsBySubject[id] || []
  return mockResponse(units)
}

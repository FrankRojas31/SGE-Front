import type { Courses } from '@/types/Courses'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Courses
const mockCoursesData: Courses[] = [
  {
    id: 1,
    nombre: 'Matemáticas',
    descripcion: 'Curso de matemáticas básicas y avanzadas',
  },
  {
    id: 2,
    nombre: 'Lenguaje',
    descripcion: 'Curso de lengua española y literatura',
  },
  {
    id: 3,
    nombre: 'Ciencias Naturales',
    descripcion: 'Curso de biología, química y física',
  },
  {
    id: 4,
    nombre: 'Historia',
    descripcion: 'Curso de historia universal y nacional',
  },
  {
    id: 5,
    nombre: 'Educación Física',
    descripcion: 'Curso de educación física y deportes',
  },
]

export async function GetCoursesMock(): Promise<ResponseHelper<Courses[]>> {
  return mockResponse(mockCoursesData)
}

export async function GetCourseMock(id: number): Promise<ResponseHelper<Courses>> {
  const course = mockCoursesData.find((c) => c.id === id)
  return mockResponse(course || null) as any
}

export async function PostCourseMock(course: Courses): Promise<ResponseHelper<Courses>> {
  const newCourse: Courses = {
    id: Math.max(...mockCoursesData.map((c) => c.id)) + 1,
    nombre: course.nombre,
    descripcion: course.descripcion,
  }
  mockCoursesData.push(newCourse)
  return mockResponse(newCourse)
}

export async function PutCourseMock(course: Courses): Promise<ResponseHelper<Courses>> {
  const index = mockCoursesData.findIndex((c) => c.id === course.id)
  if (index >= 0) {
    mockCoursesData[index] = course
    return mockResponse(course)
  }
  return mockResponse(null) as any
}

export async function DeleteCourseMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockCoursesData.findIndex((c) => c.id === id)
  if (index >= 0) {
    mockCoursesData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

import type { Courses } from '@/types/Courses'
import { GenericRequest } from '../GenericRequest'
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetCoursesMock,
  GetCourseMock,
  PostCourseMock,
  PutCourseMock,
  DeleteCourseMock,
} from '../mocks/CoursesService.mock'

const urlBase = 'CursoEscolar'

export async function GetCourses() {
  if (isMockEnabled()) return GetCoursesMock()

  return await GenericRequest<Courses[]>({
    url: `${urlBase}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

export async function GetCourse(id: number) {
  if (isMockEnabled()) return GetCourseMock(id)

  return await GenericRequest<Courses>({
    url: `${urlBase}/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

export async function PostCourse(course: Courses) {
  if (isMockEnabled()) return PostCourseMock(course)

  return await GenericRequest<Courses>({
    url: urlBase,
    method: 'POST',
    data: {
      nombre: course.nombre,
      descripcion: course.descripcion,
    },
    authToken: AuthUser(),
  })
}

export async function PutCourse(course: Courses) {
  if (isMockEnabled()) return PutCourseMock(course)

  return await GenericRequest<Courses>({
    url: `${urlBase}/${course.id}`,
    method: 'PUT',
    data: {
      id: course.id,
      nombre: course.nombre,
      descripcion: course.descripcion,
    },
    authToken: AuthUser(),
  })
}

export async function DeleteCourse(id: number) {
  if (isMockEnabled()) return DeleteCourseMock(id)

  return await GenericRequest<Courses>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
    authToken: AuthUser(),
  })
}

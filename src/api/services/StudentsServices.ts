import type { IStudent } from '@/types/Students'
import { GenericRequest } from '../GenericRequest'
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config'
import {
  GetStudentsMock,
  GetStudentMock,
  PostStudentMock,
  PutStudentMock,
  DeleteStudentMock,
} from '../mocks/StudentsServices.mock'

const urlBase = 'Alumno'

// GET: '/Alumnos'
export async function GetStudents() {
  if (isMockEnabled()) return GetStudentsMock()

  return await GenericRequest<IStudent[]>({
    url: `${urlBase}/GetAlumnosDatosCompletos`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

// POST: '/Alumnos/{
//    data
// }'
export async function PostStudent(student: IStudent) {
  if (isMockEnabled()) return PostStudentMock(student)

  return await GenericRequest<IStudent>({
    url: urlBase,
    method: 'POST',
    data: {
      matricula: student.matricula,
      fechaIngreso: student.fechaIngreso,
      idPersona: student.idPersona,
      idCursoEscolar: student.idCursoEscolar,
      contactoEmergencia: student.contactoEmergencia,
      necesidadesEspeciales: student.necesidadesEspeciales,
    },
    authToken: AuthUser(),
  })
}

// GET: '/Alumnos/5
export async function GetStudent(id: number) {
  if (isMockEnabled()) return GetStudentMock(id)

  return await GenericRequest<IStudent>({
    url: `${urlBase}/GetAlumnoDatosCompletos/${id}`,
    method: 'GET',
    authToken: AuthUser(),
  })
}

//PUT: '/Alumno/5
export async function PutStudent(student: IStudent) {
  if (isMockEnabled()) return PutStudentMock(student)

  return await GenericRequest<IStudent>({
    url: `${urlBase}/${student.id}`,
    method: 'PUT',
    data: {
      id: student.id,
      matricula: student.matricula,
      fechaIngreso: student.fechaIngreso,
      idPersona: student.idPersona,
      idCursoEscolar: student.idCursoEscolar,
      contactoEmergencia: student.contactoEmergencia,
      necesidadesEspeciales: student.necesidadesEspeciales,
    },
    authToken: AuthUser(),
  })
}

//DELETE: '/Alumno/5'
export async function DeleteStudent(id: number) {
  if (isMockEnabled()) return DeleteStudentMock(id)

  return await GenericRequest<IStudent>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
    authToken: AuthUser(),
  })
}

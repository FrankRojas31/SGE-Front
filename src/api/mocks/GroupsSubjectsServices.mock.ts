import type { IGroupsSubjects } from '@/types/GroupsSubjects'
import type { ISubject } from '@/types/Subject'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos de materias completas para devolver en GetMateriasConGrupos y GetMateriasSinGrupo
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

// Datos simulados para GroupsSubjects
const mockGroupsSubjectsData: IGroupsSubjects[] = [
  {
    Id: 1,
    IdGrupo: 1,
    IdMateria: 1, // Matemáticas
  },
  {
    Id: 2,
    IdGrupo: 1,
    IdMateria: 2, // Lengua Española
  },
  {
    Id: 3,
    IdGrupo: 1,
    IdMateria: 3, // Ciencias Naturales
  },
  {
    Id: 4,
    IdGrupo: 1,
    IdMateria: 4, // Historia
  },
  {
    Id: 5,
    IdGrupo: 1,
    IdMateria: 5, // Educación Física
  },
  {
    Id: 6,
    IdGrupo: 2,
    IdMateria: 1, // Matemáticas
  },
  {
    Id: 7,
    IdGrupo: 2,
    IdMateria: 2, // Lengua Española
  },
  {
    Id: 8,
    IdGrupo: 3,
    IdMateria: 1, // Matemáticas
  },
  {
    Id: 9,
    IdGrupo: 3,
    IdMateria: 2, // Lengua Española
  },
  {
    Id: 10,
    IdGrupo: 3,
    IdMateria: 3, // Ciencias Naturales
  },
]

export async function GetGroupsSubjectsMock(): Promise<ResponseHelper<IGroupsSubjects[]>> {
  return mockResponse(mockGroupsSubjectsData)
}

export async function GetGroupSubjectsMock(id: number): Promise<ResponseHelper<IGroupsSubjects>> {
  const groupSubjects = mockGroupsSubjectsData.find((gs) => gs.Id === id)
  return mockResponse(groupSubjects || null)
}

export async function PostGroupsSubjectsMock(
  groupSubjects: IGroupsSubjects,
): Promise<ResponseHelper<IGroupsSubjects>> {
  const newGroupSubjects: IGroupsSubjects = {
    ...groupSubjects,
    Id: Math.max(...mockGroupsSubjectsData.map((gs) => gs.Id), 0) + 1,
  }
  mockGroupsSubjectsData.push(newGroupSubjects)
  return mockResponse(newGroupSubjects)
}

export async function PutGroupSubjectsMock(
  groupSubjects: IGroupsSubjects,
): Promise<ResponseHelper<IGroupsSubjects>> {
  const index = mockGroupsSubjectsData.findIndex((gs) => gs.Id === groupSubjects.Id)
  if (index >= 0) {
    mockGroupsSubjectsData[index] = groupSubjects
    return mockResponse(groupSubjects)
  }
  return mockResponse(null)
}

export async function DeleteGroupSubjectsMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockGroupsSubjectsData.findIndex((gs) => gs.Id === id)
  if (index >= 0) {
    mockGroupsSubjectsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

// Devuelve materias de un grupo específico (como ISubject[])
export async function GetMateriasConGruposMock(id: number): Promise<ResponseHelper<ISubject[]>> {
  const materiasDelGrupo = mockGroupsSubjectsData
    .filter((gs) => gs.IdGrupo === id)
    .map((gs) => mockSubjectsData.find((s) => s.id === gs.IdMateria))
    .filter((s) => s !== undefined) as ISubject[]
  return mockResponse(materiasDelGrupo)
}

// Devuelve materias no asignadas a un grupo específico (como ISubject[])
export async function GetMateriasSinGrupoMock(id: number): Promise<ResponseHelper<ISubject[]>> {
  // Todas las materias existentes menos las que ya están en el grupo
  const materiasEnGrupo = mockGroupsSubjectsData
    .filter((gs) => gs.IdGrupo === id)
    .map((gs) => gs.IdMateria)
  const materiasSinGrupo = mockSubjectsData.filter(
    (materia) => !materiasEnGrupo.includes(materia.id),
  )
  return mockResponse(materiasSinGrupo)
}

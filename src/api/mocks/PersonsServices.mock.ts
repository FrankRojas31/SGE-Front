import type { IPerson } from '@/types/Persons'
import { mockResponse } from './mockHelper'
import type { ResponseHelper } from '@/types/ResponseHelper'

// Datos simulados para Persons
const mockPersonsData: IPerson[] = [
  {
    id: 101,
    nombre: 'Juan',
    apellidoPaterno: 'García',
    apellidoMaterno: 'López',
    fechaNacimiento: new Date('2010-05-15'),
  },
  {
    id: 102,
    nombre: 'María',
    apellidoPaterno: 'Rodríguez',
    apellidoMaterno: 'Pérez',
    fechaNacimiento: new Date('2010-08-22'),
  },
  {
    id: 103,
    nombre: 'Carlos',
    apellidoPaterno: 'Martínez',
    apellidoMaterno: 'Gómez',
    fechaNacimiento: new Date('2010-03-10'),
  },
  {
    id: 104,
    nombre: 'Ana',
    apellidoPaterno: 'Fernández',
    apellidoMaterno: 'Sánchez',
    fechaNacimiento: new Date('2010-11-30'),
  },
  {
    id: 105,
    nombre: 'Pedro',
    apellidoPaterno: 'López',
    apellidoMaterno: 'Jiménez',
    fechaNacimiento: new Date('2010-07-18'),
  },
]

export async function GetPersonsMock(): Promise<ResponseHelper<IPerson[]>> {
  return mockResponse(mockPersonsData)
}

export async function GetPersonMock(id: number): Promise<ResponseHelper<IPerson>> {
  const person = mockPersonsData.find((p) => p.id === id)
  return mockResponse(person || null)
}

export async function PostPersonMock(person: IPerson): Promise<ResponseHelper<IPerson>> {
  const newPerson: IPerson = {
    ...person,
    id: Math.max(...mockPersonsData.map((p) => p.id), 0) + 1,
  }
  mockPersonsData.push(newPerson)
  return mockResponse(newPerson)
}

export async function PutPersonMock(person: IPerson): Promise<ResponseHelper<IPerson>> {
  const index = mockPersonsData.findIndex((p) => p.id === person.id)
  if (index >= 0) {
    mockPersonsData[index] = person
    return mockResponse(person)
  }
  return mockResponse(null)
}

export async function DeletePersonMock(id: number): Promise<ResponseHelper<boolean>> {
  const index = mockPersonsData.findIndex((p) => p.id === id)
  if (index >= 0) {
    mockPersonsData.splice(index, 1)
    return mockResponse(true)
  }
  return mockResponse(false)
}

import type { IPerson } from '@/types/Persons';
import { GenericRequest } from "../GenericRequest";
import { AuthUser } from '@/utils/helpers.ts'
import { isMockEnabled } from '../config/mock.config';
import {
  GetPersonsMock,
  GetPersonMock,
  PostPersonMock,
  PutPersonMock,
  DeletePersonMock
} from '../mocks/PersonsServices.mock';

const urlBase = "Persona";

// GET: '/Persona'
export async function GetPersons(){
  if (isMockEnabled()) return GetPersonsMock();

  return await GenericRequest<IPerson[]>({ url: `${urlBase}`, method: "GET", authToken: AuthUser() });
}

// GET: '/GetPersonaSinAlumno'
export async function GetPersonsWithOutStudent(){
  if (isMockEnabled()) return GetPersonsMock(); // TODO: Implementar lógica de mock específica si es necesario

  return await GenericRequest<IPerson[]>({ url: `${urlBase}/GetPersonaSinAlumno`, method: "GET", authToken: AuthUser()});
}

// POST: '/Persona/{
//    data
// }'
export async function PostPerson(person: IPerson){
  if (isMockEnabled()) return PostPersonMock(person);

  return await GenericRequest<IPerson>({ url: urlBase, method : "POST", data: {
    nombre: person.nombre,
    apellidoPaterno: person.apellidoPaterno,
    apellidoMaterno: person.apellidoMaterno,
    fechaNacimiento: person.fechaNacimiento,
  },
    authToken: AuthUser()
  });
}

// GET: '/Persona/5
export async function GetPerson(id: number){
  if (isMockEnabled()) return GetPersonMock(id);

  return await GenericRequest<IPerson>({ url: `${urlBase}/${id}`, method: "GET", authToken: AuthUser()})
}

//PUT: '/Persona/5
export async function PutPerson(person: IPerson){
  if (isMockEnabled()) return PutPersonMock(person);

  return await GenericRequest<IPerson>({ url: `${urlBase}/${person.id}`, method: "PUT", data: {
    id: person.id,
    nombre: person.nombre,
    apellidoPaterno: person.apellidoPaterno,
    apellidoMaterno: person.apellidoMaterno,
    fechaNacimiento: person.fechaNacimiento,
  },
    authToken: AuthUser()
  });
}

//DELETE: '/Persona/5'
export async function DeletePerson(id: number) {
  if (isMockEnabled()) return DeletePersonMock(id);
  return await GenericRequest<IPerson>({ url: `${urlBase}/${id}`, method: 'DELETE', authToken: AuthUser()});
}

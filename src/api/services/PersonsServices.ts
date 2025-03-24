import type { IPerson } from '@/types/Persons';
import { GenericRequest } from "../GenericRequest";

const urlBase = "Persona";

// GET: '/Persona'
export async function GetPersons(){
  return await GenericRequest<IPerson[]>({ url: `${urlBase}`, method: "GET" });
}

// GET: '/GetPersonaSinAlumno'
export async function GetPersonsWithOutStudent(){
  return await GenericRequest<IPerson[]>({ url: `${urlBase}/GetPersonaSinAlumno`, method: "GET" });
}

// POST: '/Persona/{
//    data
// }'
export async function PostPerson(person: IPerson){
  return await GenericRequest<IPerson>({ url: urlBase, method : "POST", data: {
    nombre: person.nombre,
    apellidoPaterno: person.apellidoPaterno,
    apellidoMaterno: person.apellidoMaterno,
    fechaNacimiento: person.fechaNacimiento,
  }});
}

// GET: '/Persona/5
export async function GetPerson(id: number){
  return await GenericRequest<IPerson>({ url: `${urlBase}/${id}`, method: "GET"})
}

//PUT: '/Persona/5
export async function PutPerson(person: IPerson){
  return await GenericRequest<IPerson>({ url: `${urlBase}/${person.id}`, method: "PUT", data: {
    id: person.id,
    nombre: person.nombre,
    apellidoPaterno: person.apellidoPaterno,
    apellidoMaterno: person.apellidoMaterno,
    fechaNacimiento: person.fechaNacimiento,
  }});
}

//DELETE: '/Persona/5'
export async function DeletePerson(id: number) {
  return await GenericRequest<IPerson>({ url: `${urlBase}/${id}`, method: 'DELETE'});
}

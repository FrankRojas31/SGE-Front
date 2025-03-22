import type { IPerson } from '@/types/Persons';
import { GenericRequest } from "../GenericRequest";

const urlBase = "Persona";

// GET: '/Persona'
export async function GetPersons(){
  return await GenericRequest<IPerson[]>({ url: `${urlBase}`, method: "GET" });
}

// POST: '/Persona/{
//    data
// }'
export async function PostPerson(person: IPerson){
  return await GenericRequest<IPerson>({ url: urlBase, method : "POST", data: {
    person
  }});
}

// GET: '/Persona/5
export async function GetPerson(id: number){
  return await GenericRequest<IPerson>({ url: `${urlBase}/${id}`, method: "GET"})
}

//PUT: '/Persona/5
export async function PutPerson(person: IPerson){
  return await GenericRequest<IPerson>({ url: `${urlBase}/${person.id}`, method: "PUT"});
}

//DELETE: '/Persona/5'
export async function DeletePerson(id: number) {
  return await GenericRequest<IPerson>({ url: `${urlBase}/${id}`, method: 'DELETE'});
}

import type { ISubject } from '@/types/Subject';
import { GenericRequest } from "../GenericRequest";

const urlBase = "Materias";

// GET: '/Materias'
export async function GetSubjects(){
  return await GenericRequest<ISubject[]>({ url: `${urlBase}`, method: "GET" });
}

// POST: '/Materias/{
//    data
// }'
export async function PostSubject(subject: ISubject){
  return await GenericRequest<ISubject>({ url: urlBase, method : "POST", data: {
    nombre: subject.nombre,
    descripcion: subject.descripcion,
  }});
}

// GET: '/Materias/5
export async function GetSubject(id: number){
  return await GenericRequest<ISubject>({ url: `${urlBase}/${id}`, method: "GET"})
}

//PUT: '/Materias/5
export async function PutSubject(subject: ISubject){
  return await GenericRequest<ISubject>({ url: `${urlBase}/${subject.id}`, method: "PUT", data: {
    id: subject.id,
    nombre: subject.nombre,
    descripcion: subject.descripcion
  }});
}

//DELETE: '/Materias/5'
export async function DeleteSubject(id: number) {
  return await GenericRequest<ISubject>({ url: `${urlBase}/${id}`, method: 'DELETE'});
}

import type { ISchoolYear } from "@/types/SchoolYear";
import { GenericRequest } from "../GenericRequest";

const urlBase = "CursoEscolar";

// GET: '/CursoEscolar'
export async function GetSchoolYears(){
  return await GenericRequest<ISchoolYear[]>({ url: `${urlBase}`, method: "GET" });
}

// POST: '/CursoEscolar/{
//    data
// }'
export async function PostSchoolYear(schoolYear: ISchoolYear){
  return await GenericRequest<ISchoolYear>({ url: urlBase, method : "POST", data: {
    schoolYear
  }});
}

// GET: '/CursoEscolar/5
export async function GetSchoolYear(id: number){
  return await GenericRequest<ISchoolYear>({ url: `${urlBase}/${id}`, method: "GET"})
}

//PUT: '/CursoEscolar/5
export async function PutSchoolYear(schoolYear: ISchoolYear){
  return await GenericRequest<ISchoolYear>({ url: `${urlBase}/${schoolYear.id}`, method: "PUT"});
}

//DELETE: '/CursoEscolar/5'
export async function DeleteSchoolYear(id: number) {
  return await GenericRequest<ISchoolYear>({ url: `${urlBase}/${id}`, method: 'DELETE'});
}

import type { ISchoolYear } from "@/types/SchoolYear";
import { GenericRequest } from "../GenericRequest";
import { AuthUser } from '@/utils/helpers.ts'

const urlBase = "CursoEscolar";

// GET: '/CursoEscolar'
export async function GetSchoolYears(){
  return await GenericRequest<ISchoolYear[]>({ url: `${urlBase}`, method: "GET", authToken: AuthUser() });
}

// POST: '/CursoEscolar/{
//    data
// }'
export async function PostSchoolYear(schoolYear: ISchoolYear){
  return await GenericRequest<ISchoolYear>({ url: urlBase, method : "POST", data: {
    schoolYear
  },
    authToken: AuthUser()
  });
}

// GET: '/CursoEscolar/5
export async function GetSchoolYear(id: number){
  return await GenericRequest<ISchoolYear>({ url: `${urlBase}/${id}`, method: "GET", authToken: AuthUser()})
}

//PUT: '/CursoEscolar/5
export async function PutSchoolYear(schoolYear: ISchoolYear){
  return await GenericRequest<ISchoolYear>({ url: `${urlBase}/${schoolYear.id}`, method: "PUT", authToken: AuthUser()});
}

//DELETE: '/CursoEscolar/5'
export async function DeleteSchoolYear(id: number) {
  return await GenericRequest<ISchoolYear>({ url: `${urlBase}/${id}`, method: 'DELETE', authToken: AuthUser()});
}

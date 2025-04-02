import type { IPeriods } from "@/types/Periods";
import { GenericRequest } from "../GenericRequest";
import { AuthUser } from '@/utils/helpers.ts'

const urlBase = "Periodos";

// GET: '/Periodos'
export async function GetPeriods(){
  return await GenericRequest<IPeriods[]>({ url: `${urlBase}`, method: "GET", authToken: AuthUser() });
}

// GET: '/GetPeriodoActivo'
export async function GetPeriodActive(){
  return await GenericRequest<IPeriods>({ url: `${urlBase}/GetPeriodoActivo`, method: "GET", authToken: AuthUser() });
}

// POST: '/Periodos/{
//    data
// }'
export async function PostPeriod(period: IPeriods){
  return await GenericRequest<IPeriods>({ url: `${urlBase}/PostPeriodo`, method : "POST", data: {
    nombre: period.nombre,
    descripcion: period.descripcion,
    fechaInicio: period.fechaInicio,
    fechaFin: period.fechaFin,
    estatusPeriodo: period.estatusPeriodo
  },
    authToken: AuthUser()
  });
}

//GET: '/Periodos/{id}
export async function GetPeriod(id: number){
  return await GenericRequest<IPeriods>({ url: `${urlBase}/${id}`, method: "GET", authToken: AuthUser()})
}

//PUT: '/Periodos/{id}

export async function PutPeriod(period: IPeriods){
  return await GenericRequest<IPeriods>({ url: `${urlBase}/PutPeriodo`, method: "PUT", data: {
    id: period.id,
    nombre: period.nombre,
    descripcion: period.descripcion,
    fechaInicio: period.fechaInicio,
    fechaFin: period.fechaFin,
    estatusPeriodo: period.estatusPeriodo
  },
    authToken: AuthUser()
  });
}

//DELETE: '/Periodos/{id}
export async function DeletePeriod(id: number) {
  return await GenericRequest<IPeriods>({ url: `${urlBase}/${id}`, method: 'DELETE', authToken: AuthUser()});
}

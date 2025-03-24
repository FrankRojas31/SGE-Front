import type { IPeriods } from "@/types/Periods";
import { GenericRequest } from "../GenericRequest";

const urlBase = "Periodos";

// GET: '/Periodos'
export async function GetPeriods(){
  return await GenericRequest<IPeriods[]>({ url: `${urlBase}`, method: "GET" });
}

// POST: '/Periodos/{
//    data
// }'
export async function PostPeriod(period: IPeriods){
  return await GenericRequest<IPeriods>({ url: urlBase, method : "POST", data: {
    nombre: period.nombre,
    descripcion: period.descripcion,
    fechaInicio: period.fechaInicio,
    fechaFin: period.fechaFin,
    estatusPeriodo: period.estatusPeriodo
  }});
}

//GET: '/Periodos/{id}
export async function GetPeriod(id: number){
  return await GenericRequest<IPeriods>({ url: `${urlBase}/${id}`, method: "GET"})
}

//PUT: '/Periodos/{id}

export async function PutPeriod(period: IPeriods){
  return await GenericRequest<IPeriods>({ url: `${urlBase}/${period.id}`, method: "PUT", data: {
    id: period.id,
    nombre: period.nombre,
    descripcion: period.descripcion,
    fechaInicio: period.fechaInicio,
    fechaFin: period.fechaFin,
    estatusPeriodo: period.estatusPeriodo
  }});
}

//DELETE: '/Periodos/{id}
export async function DeletePeriod(id: number) {
  return await GenericRequest<IPeriods>({ url: `${urlBase}/${id}`, method: 'DELETE'});
}

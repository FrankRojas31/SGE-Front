import type { Units } from "@/types/Unit";
import { GenericRequest } from "../GenericRequest";

const urlBase = "Unidades";

export async function GetUnits() {
  return await GenericRequest<Units[]>({
    url: `${urlBase}`,
    method: "GET",
  });
}

export async function GetUnit(id: number) {
  return await GenericRequest<Units>({
    url: `${urlBase}/${id}`,
    method: "GET",
  });
}

export async function PostUnit(unit: Units) {
  return await GenericRequest<Units>({
    url: urlBase,
    method: "POST",
    data: {
      nombre: unit.nombre,
      descripcion: unit.descripcion,
      idMateria: unit.idMateria,
    },
  });
}

export async function PutUnit(unit: Units) {
  return await GenericRequest<Units>({
    url: `${urlBase}/${unit.id}`,
    method: "PUT",
    data: {
      id: unit.id,
      nombre: unit.nombre,
      descripcion: unit.descripcion,
      idMateria: unit.idMateria,
    },
  });
}

export async function DeleteUnit(id: number) {
  return await GenericRequest<Units>({
    url: `${urlBase}/${id}`,
    method: "DELETE",
  });
}

import type {Groups} from "@/types/Groups";
import { GenericRequest } from "../GenericRequest";

const urlBase = "Grupos";

// Obtener todos los grupos
export async function GetGroups() {
  return await GenericRequest<Groups[]>({
    url: `${urlBase}`,
    method: "GET",
  });
}

// Obtener un grupo por ID
export async function GetGroup(id: number) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/${id}`,
    method: "GET",
  });
}

// Crear un nuevo grupo
export async function PostGroup(group: Groups) {
  return await GenericRequest<Groups>({
    url: urlBase,
    method: "POST",
    data: {
      nombre: group.nombre,
      descripcion: group.descripcion,
      // Agrega aquí otros campos necesarios para crear un grupo
    },
  });
}

// Actualizar un grupo existente
export async function PutGroup(group: Groups) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/${group.id}`,
    method: "PUT",
    data: {
      id: group.id,
      nombre: group.nombre,
      descripcion: group.descripcion,
      // Agrega aquí otros campos que puedan ser actualizados
    },
  });
}

// Eliminar un grupo por ID
export async function DeleteGroup(id: number) {
  return await GenericRequest<Groups>({
    url: `${urlBase}/${id}`,
    method: "DELETE",
  });
}

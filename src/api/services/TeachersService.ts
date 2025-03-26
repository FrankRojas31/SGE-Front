import type {ITeachers } from "@/types/Teachers";
import { GenericRequest } from "../GenericRequest";

const urlBase = "Profesor";

// Obtener todos los profesores
export async function GetTeachers() {
  return await GenericRequest<ITeachers[]>({
    url: `${urlBase}`,
    method: "GET",
  });
}

// Obtener un profesor por ID
export async function GetTeacher(id: number) {
  return await GenericRequest<ITeachers>({
    url: `${urlBase}/${id}`,
    method: "GET",
  });
}

// Crear un nuevo profesor
export async function PostTeacher(teacher: ITeachers) {
  return await GenericRequest<ITeachers>({
    url: urlBase,
    method: "POST",
    data: {
      noEmpleado: teacher.noEmpleado,
      especialidad: teacher.especialidad,
      gradoEstudios: teacher.gradoEstudios,
      cedulaProfesional: teacher.cedulaProfesional,
      fechaIngreso: teacher.fechaIngreso,
      idPersona: teacher.idPersona,
      esBorrado: teacher.esBorrado,
    },
  });
}

// Actualizar un profesor existente
export async function PutTeacher(teacher: ITeachers) {
  return await GenericRequest<ITeachers>({
    url: `${urlBase}/${teacher.id}`,
    method: "PUT",
    data: {
      id: teacher.id,
      noEmpleado: teacher.noEmpleado,
      especialidad: teacher.especialidad,
      gradoEstudios: teacher.gradoEstudios,
      cedulaProfesional: teacher.cedulaProfesional,
      fechaIngreso: teacher.fechaIngreso,
      idPersona: teacher.idPersona,
      esBorrado: teacher.esBorrado,
    },
  });
}

// Eliminar un profesor por ID
export async function DeleteTeacher(id: number) {
  return await GenericRequest<ITeachers>({
    url: `${urlBase}/${id}`,
    method: "DELETE",
  });
}

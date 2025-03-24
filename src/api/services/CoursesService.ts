import type {Courses} from "@/types/Courses";
import { GenericRequest } from "../GenericRequest";

const urlBase = "CursoEscolar";

// Obtener todos los cursos
export async function GetCourses() {
  return await GenericRequest<Courses[]>({
    url: `${urlBase}`,
    method: "GET",
  });
}

// Obtener un curso por ID
export async function GetCourse(id: number) {
  return await GenericRequest<Courses>({
    url: `${urlBase}/${id}`,
    method: "GET",
  });
}

// Crear un nuevo curso
export async function PostCourse(course: Courses) {
  return await GenericRequest<Courses>({
    url: urlBase,
    method: "POST",
    data: {
      nombre: course.nombre,
      descripcion: course.descripcion,
      // Agrega aquí otros campos necesarios para crear un curso
    },
  });
}

// Actualizar un curso existente
export async function PutCourse(course: Courses) {
  return await GenericRequest<Courses>({
    url: `${urlBase}/${course.id}`,
    method: "PUT",
    data: {
      id: course.id,
      nombre: course.nombre,
      descripcion: course.descripcion,    },
  });
}

// Eliminar un curso por ID
export async function DeleteCourse(id: number) {
  return await GenericRequest<Courses>({
    url: `${urlBase}/${id}`,
    method: "DELETE",
  });
}

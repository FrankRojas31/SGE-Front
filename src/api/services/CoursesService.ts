import type {Courses} from "@/types/Courses";
import { GenericRequest } from "../GenericRequest";

const urlBase = "CursoEscolar";

export async function GetCourses() {
  return await GenericRequest<Courses[]>({
    url: `${urlBase}`,
    method: "GET",
  });
}

export async function GetCourse(id: number) {
  return await GenericRequest<Courses>({
    url: `${urlBase}/${id}`,
    method: "GET",
  });
}

export async function PostCourse(course: Courses) {
  return await GenericRequest<Courses>({
    url: urlBase,
    method: "POST",
    data: {
      nombre: course.nombre,
      descripcion: course.descripcion,
    },
  });
}

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

export async function DeleteCourse(id: number) {
  return await GenericRequest<Courses>({
    url: `${urlBase}/${id}`,
    method: "DELETE",
  });
}

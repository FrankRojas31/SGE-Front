import type { IStudent } from "@/types/Students";
import { GenericRequest } from "../GenericRequest";

const urlBase = "Alumno";

// GET: '/Alumnos'
export async function GetStudents(){
  return await GenericRequest<IStudent[]>({ url: `${urlBase}/GetAlumnosDatosCompletos`, method: "GET" });
}

// POST: '/Alumnos/{
//    data
// }'
export async function PostStudent(student: IStudent){
  return await GenericRequest<IStudent>({ url: urlBase, method : "POST", data: {
    matricula: student.matricula,
    fechaIngreso: student.fechaIngreso,
    idPersona: student.idPersona,
    idCursoEscolar: student.idCursoEscolar,
    contactoEmergencia: student.contactoEmergencia,
    necesidadesEspeciales: student.necesidadesEspeciales,
  }});
}

// GET: '/Alumnos/5
export async function GetStudent(id: number){
  return await GenericRequest<IStudent>({ url: `${urlBase}/GetAlumnoDatosCompletos/${id}`, method: "GET"})
}

//PUT: '/Alumno/5
export async function PutStudent(student: IStudent){
  return await GenericRequest<IStudent>({ url: `${urlBase}/${student.id}`, method: "PUT" , data: {
    id: student.id,
    matricula: student.matricula,
    fechaIngreso: student.fechaIngreso,
    idPersona: student.idPersona,
    idCursoEscolar: student.idCursoEscolar,
    contactoEmergencia: student.contactoEmergencia,
    necesidadesEspeciales: student.necesidadesEspeciales,
  }});
}

//DELETE: '/Alumno/5'
export async function DeleteStudent(id: number) {
  return await GenericRequest<IStudent>({ url: `${urlBase}/${id}`, method: 'DELETE'});
}

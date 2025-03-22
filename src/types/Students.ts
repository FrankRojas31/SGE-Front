export interface IStudent {
  id: number;
  nombreCompleto: string;
  matricula: number;
  fechaIngreso: Date;
  estado: boolean;
  cursoEscolar: string;
  idPersona: number
  idCursoEscolar: number;
  necesidadesEspeciales: string;
  contactoEmergencia: string;
}

export interface IStudentCreate extends Omit<IStudent, "nombreCompleto" | "estado"> {
  estado: boolean;
}

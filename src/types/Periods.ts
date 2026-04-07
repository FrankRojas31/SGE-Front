export interface IPeriods {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  estatusPeriodo: string;
}


export enum estatusPeriodo {
  "EN_ESPERA",
  "ACTIVO",
  "FINALIZADO"
}


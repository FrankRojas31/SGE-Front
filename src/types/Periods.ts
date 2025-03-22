export interface IPeriods {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  estatusPeriodo: estatusPeriodo;
}


export enum estatusPeriodo {
  "EN ESPERA" = 0,
  "ACTIVO" = 1,
  "FINALIZADO" = 2
}


import type { IColumns } from "@/types/GenericTable";

export const columns: IColumns[] = [

  { field: 'nombre', header: 'Nombre' },
  { field: 'descripcion', header: 'Descripción' },
  { field: 'fechaInicio', header: 'Fecha de Inicio' },
  { field: 'fechaFin', header: 'Fecha de Fin' },
  { field: 'estatusPeriodo', header: 'Estatus del Periodo' },
];

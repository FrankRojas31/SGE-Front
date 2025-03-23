import type { IColumns } from "@/types/GenericTable";

export const columnsPerson: IColumns[] = [
  { field: "nombre", header: "Nombre" },
  { field: "apellidoPaterno", header: "Apellido Paterno" },
  { field: "apellidoMaterno", header: "Apellido Materno" },
  { field: "fechaNacimiento", header: "Fecha de Nacimiento" },
];

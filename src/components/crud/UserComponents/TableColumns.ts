import type { IColumns } from "@/types/GenericTable";

export const columnsUser: IColumns[] = [
  { field: "name", header: "Nombre" },
  { field: "email", header: "Correo Electrónico" },
  { field: "rol", header: "Rol" },
  { field: "estatusUsuario", header: "Estatus" },
  { field: "idPersona", header: "ID Persona" },
];

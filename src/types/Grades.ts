export interface IGrades {
  id: number
  idUnidad: number
  idAlumno: number
  calificacion: number
  fecha?: Date
  descripcion?: string
}

export type Grades = IGrades

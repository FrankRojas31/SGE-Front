import type { ICalifications } from '@/types/Califications';
import { GenericRequest } from '../GenericRequest';

const urlBase = "Calificaciones";

// GET: '/api/ICalifications'
export async function GetCalifications() {
  return await GenericRequest<ICalifications[]>({
    url: `${urlBase}`,
    method: 'GET',
  });
}

// POST: '/api/ICalifications'
export async function PostCalification(calificacion: ICalifications) {
  return await GenericRequest<ICalifications>({
    url: urlBase,
    method: 'POST',
    data: {
      id: calificacion.id,
      calificacion: calificacion.calificacion,
      idAlumno: calificacion.idAlumno,
      idUnidad: calificacion.idUnidad
    },
  });
}

// GET: '/api/ICalifications/{id}'
export async function GetCalification(id: number) {
  return await GenericRequest<ICalifications>({
    url: `${urlBase}/${id}`,
    method: 'GET',
  });
}

// PUT: '/api/ICalifications/{id}'
export async function PutCalification(calificacion: ICalifications) {
  return await GenericRequest<ICalifications>({
    url: `${urlBase}/${calificacion.id}`,
    method: 'PUT',
    data: {
      id: calificacion.id,
      calificacion: calificacion.calificacion,
      idAlumno: calificacion.idAlumno,
      idUnidad: calificacion.idUnidad
    },
  });
}

// DELETE: '/api/ICalifications/{id}'
export async function DeleteCalification(id: number) {
  return await GenericRequest<ICalifications>({
    url: `${urlBase}/${id}`,
    method: 'DELETE',
  });
}

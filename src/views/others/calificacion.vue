<template>
  <AppLayout>
    <div class="sistema-calificaciones container mx-auto p-6">
      <div class="flex flex-column md:flex-row justify-content-between gap-3 mb-4">
        <div class="flex flex-column sm:flex-row gap-2 align-items-center">
          <h1 class="text-3xl font-bold text-gray-800">Grupo: {{ group?.nombre || 'Cargando...' }}</h1>
          <p>Descripción: {{ group?.descripcion || 'N/A' }}</p>
          <Select
            v-if="materiasGrupo.length > 0"
            v-model="materiaSeleccionada"
            :options="materiasOpciones"
            optionLabel="nombre"
            placeholder="Seleccionar materia"
            class="w-full sm:w-14rem"
            showClear
          />
          <p v-if="materiasGrupo.length === 0" class="text-red-500 mt-2">No se encontraron materias para este grupo.</p>
        </div>
      </div>

      <!-- Tabla de calificaciones -->
      <Card class="p-0">
        <template #content>
          <div class="overflow-x-auto">
            <table class="alumnos-table">
              <thead>
                <tr>
                  <th class="sticky left-0 bg-gray-100" :rowspan="mostrarTodasMaterias ? 2 : 2">NOMBRE</th>
                  <template v-if="mostrarTodasMaterias">
                    <template v-for="materia in materiasGrupo" :key="materia.id">
                      <th :colspan="materiaUnidades[materia.id]?.length + 1">{{ materia.nombre.toUpperCase() }}</th>
                    </template>
                    <th :rowspan="2">PROMEDIO GENERAL</th>
                  </template>
                  <template v-else>
                    <th :colspan="unidades.length + 1">{{ materiaSeleccionada?.nombre.toUpperCase() }}</th>
                    <th :rowspan="2">PROMEDIO GENERAL</th>
                  </template>
                </tr>
                <tr>
                  <template v-if="mostrarTodasMaterias">
                    <template v-for="materia in materiasGrupo" :key="materia.id">
                      <template v-for="unit in materiaUnidades[materia.id]" :key="unit.id">
                        <th>{{ unit.nombre.toUpperCase() }}</th>
                      </template>
                      <th>PROM.</th>
                    </template>
                  </template>
                  <template v-else>
                    <template v-for="unit in unidades" :key="unit.id">
                      <th>{{ unit.nombre.toUpperCase() }}</th>
                    </template>
                    <th>PROM.</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.id">
                  <td class="sticky left-0 bg-white">{{ student.nombreCompleto }}</td>
                  <template v-if="mostrarTodasMaterias">
                    <template v-for="materia in materiasGrupo" :key="materia.id">
                      <template v-for="unit in materiaUnidades[materia.id]" :key="unit.id">
                        <td>
                          <div class="calificacion-celda relative" :class="getCalificacionClass(calificaciones[student.id + '-' + unit.id])">
                            <span class="block w-full h-full py-1 px-2">
                              {{ calificaciones[student.id + '-' + unit.id] ?? '-' }}
                            </span>
                            <div class="calificacion-menu absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center bg-white bg-opacity-90" tabindex="0" @click.stop>
                              <div v-if="editingCell !== `${student.id}-${unit.id}`" class="flex gap-1 p-1">
                                <button class="text-blue-500 hover:text-blue-700" aria-label="Editar calificación" @click="editCalification(student.id, unit.id)">
                                  <i class="pi pi-file-edit text-sm"></i>
                                </button>
                              </div>
                              <div v-else class="flex gap-1 p-1">
                                <input
                                  type="number"
                                  min="0"
                                  max="10"
                                  step="0.1"
                                  v-model.number="tempCalification"
                                  class="calification-input"
                                  ref="calificationInput"
                                  autofocus
                                />
                                <button class="text-gray-500 hover:text-gray-700" aria-label="Guardar cambios" @click="saveCalification(student.id, unit.id)">
                                  <i class="pi pi-save text-sm"></i>
                                </button>
                                <button class="text-gray-500 hover:text-gray-700" aria-label="Cerrar menú" @click="cancelEdit()">
                                  <i class="pi pi-times text-sm"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </template>
                      <td>
                        <div :class="getCalificacionClass(calculateAverageForMateria(student.id, materia.id))" class="font-medium px-2 py-1 border-round">
                          {{ calculateAverageForMateria(student.id, materia.id) || '-' }}
                        </div>
                      </td>
                    </template>
                  </template>
                  <template v-else>
                    <template v-for="unit in unidades" :key="unit.id">
                      <td>
                        <div class="calificacion-celda relative" :class="getCalificacionClass(calificaciones[student.id + '-' + unit.id])">
                          <span class="block w-full h-full py-1 px-2">
                            {{ calificaciones[student.id + '-' + unit.id] ?? '-' }}
                          </span>
                          <div class="calificacion-menu absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center bg-white bg-opacity-90" tabindex="0" @click.stop>
                            <div v-if="editingCell !== `${student.id}-${unit.id}`" class="flex gap-1 p-1">
                              <button class="text-blue-500 hover:text-blue-700" aria-label="Editar calificación" @click="editCalification(student.id, unit.id)">
                                <i class="pi pi-file-edit text-sm"></i>
                              </button>
                            </div>
                            <div v-else class="flex gap-1 p-1">
                              <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                v-model.number="tempCalification"
                                class="calification-input"
                                ref="calificationInput"
                                autofocus
                              />
                              <button class="text-gray-500 hover:text-gray-700" aria-label="Guardar cambios" @click="saveCalification(student.id, unit.id)">
                                <i class="pi pi-save text-sm"></i>
                              </button>
                              <button class="text-gray-500 hover:text-gray-700" aria-label="Cerrar menú" @click="cancelEdit()">
                                <i class="pi pi-times text-sm"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </template>
                    <td>
                      <div :class="getCalificacionClass(calculateAverageForMateria(student.id, materiaSeleccionada?.id))" class="font-medium px-2 py-1 border-round">
                        {{ calculateAverageForMateria(student.id, materiaSeleccionada?.id) || '-' }}
                      </div>
                    </td>
                  </template>
                  <td>
                    <div :class="getCalificacionClass(calculateGeneralAverage(student.id))" class="font-medium px-2 py-1 border-round">
                      {{ calculateGeneralAverage(student.id) || '-' }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </Card>

      <div class="text-sm text-gray-500 text-center mt-3">
        Total: {{ students.length }} alumnos | Última actualización: 26/03/2025
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { GetGroup } from '@/utils/helpers';
import { useGroupsStudentStore } from '@/stores/GroupsStudentStore';
import { useGroupsSubjectStore } from '@/stores/GroupsSubjectsStore';
import { useSubjectStore } from '@/stores/SubjectStore';
import { useCalificationsStore } from '@/stores/CalificationStore';
import Select from 'primevue/select';
import Card from 'primevue/card';
import AppLayout from '@/layout/AppLayout.vue';
import type { Groups } from '@/types/Groups';
import type { IStudent } from '@/types/Students';
import type { ISubject } from '@/types/Subject';
import type { Units } from '@/types/Unit';
import type { ICalifications } from '@/types/Califications';

// Instancias
const route = useRoute();
const groupsStudentStore = useGroupsStudentStore();
const groupsSubjectStore = useGroupsSubjectStore();
const subjectStore = useSubjectStore();
const calificationsStore = useCalificationsStore();

// Variables reactivas
const groupId = ref(Number(route.params.id));
const group = ref<Groups | null>(null);
const students = ref<IStudent[]>([]);
const materiasGrupo = ref<ISubject[]>([]);
const materiaSeleccionada = ref<ISubject | null>(null);
const unidades = ref<Units[]>([]);
const materiaUnidades = ref<Record<number, Units[]>>({}); // Unidades por materia
const calificaciones = ref<{ [key: string]: number }>({}); // Almacenar calificaciones como { "idAlumno-idUnidad": calificacion }
const editingCell = ref<string | null>(null); // Celda que se está editando
const tempCalification = ref<number | null>(null); // Calificación temporal durante la edición
const originalCalification = ref<number | null>(null); // Calificación original antes de editar

// Opciones para el Select, incluyendo "Todas las materias"
const materiasOpciones = computed(() => {
  const todasMaterias = { id: 0, nombre: 'Todas las materias' } as ISubject;
  return [todasMaterias, ...materiasGrupo.value];
});

// Determinar si se deben mostrar todas las materias
const mostrarTodasMaterias = computed(() => materiaSeleccionada.value?.id === 0);

// Cargar datos iniciales
const fetchData = async () => {
  console.log('Iniciando fetchData con groupId:', groupId.value);

  // GET Grupo por ID (usando helper)
  try {
    console.log('Cargando grupo...');
    const groupResponse = await GetGroup(groupId.value);
    if (groupResponse?.success) {
      group.value = groupResponse.data;
      console.log('Grupo cargado:', group.value);
    } else {
      console.error('Error al cargar el grupo:', groupResponse?.message);
    }
  } catch (error) {
    console.error('Excepción al cargar el grupo:', error);
  }

  // GET Alumnos con grupo (usando store)
  try {
    console.log('Cargando alumnos...');
    const studentsResponse = await groupsStudentStore.GetStoreGroupsStudentsWhithGroup(groupId.value);
    if (studentsResponse?.success) {
      students.value = groupsStudentStore.groupsStudentList || [];
      console.log('Alumnos cargados:', students.value);
    } else {
      console.error('Error al cargar alumnos:', studentsResponse?.message);
      students.value = [];
    }
  } catch (error) {
    console.error('Excepción al cargar alumnos:', error);
    students.value = [];
  }

  // GET Materias del grupo (usando GroupsSubjectStore)
  try {
    console.log('Cargando materias del grupo...');
    const materiasResponse = await groupsSubjectStore.GetStoreGroupsSubjectsWithGroup(groupId.value);
    if (materiasResponse?.success) {
      materiasGrupo.value = groupsSubjectStore.groupsSubjectsList || [];
      console.log('Materias del grupo cargadas:', materiasGrupo.value);

      // Cargar las unidades de todas las materias
      for (const materia of materiasGrupo.value) {
        try {
          console.log('Cargando unidades para la materia:', materia.id);
          const unitsResponse = await subjectStore.GetStoreUnitsForSubject(materia.id);
          if (unitsResponse?.success) {
            materiaUnidades.value[materia.id] = unitsResponse.data || [];
            console.log(`Unidades cargadas para la materia ${materia.id}:`, materiaUnidades.value[materia.id]);
          } else {
            console.error(`Error al cargar unidades para la materia ${materia.id}:`, unitsResponse?.message);
            materiaUnidades.value[materia.id] = [];
          }
        } catch (error) {
          console.error(`Excepción al cargar unidades para la materia ${materia.id}:`, error);
          materiaUnidades.value[materia.id] = [];
        }
      }
    } else {
      console.error('Error al cargar materias del grupo:', materiasResponse?.message);
      materiasGrupo.value = [];
    }
  } catch (error) {
    console.error('Excepción al cargar materias del grupo:', error);
    materiasGrupo.value = [];
  }

  // Cargar calificaciones existentes
  try {
    console.log('Cargando calificaciones...');
    const calificationsResponse = await calificationsStore.GetStoreCalifications();
    if (calificationsResponse?.success) {
      const calificationsList = calificationsStore.calificationsList || [];
      console.log('Calificaciones cargadas:', calificationsList);
      // Mapear las calificaciones a la estructura { "idAlumno-idUnidad": calificacion }
      calificationsList.forEach((cal: ICalifications) => {
        const key = `${cal.idAlumno}-${cal.idUnidad}`;
        calificaciones.value[key] = cal.calificacion;
      });
    } else {
      console.error('Error al cargar calificaciones:', calificationsResponse?.message);
    }
  } catch (error) {
    console.error('Excepción al cargar calificaciones:', error);
  }

  // Seleccionar "Todas las materias" por defecto
  materiaSeleccionada.value = { id: 0, nombre: 'Todas las materias' } as ISubject;
};

// Cargar unidades cuando cambia la materia seleccionada
watch(materiaSeleccionada, async (newMateria) => {
  if (newMateria && newMateria.id !== 0) {
    try {
      console.log('Cargando unidades para la materia:', newMateria.id);
      const unitsResponse = await subjectStore.GetStoreUnitsForSubject(newMateria.id);
      if (unitsResponse?.success) {
        unidades.value = unitsResponse.data || [];
        console.log('Unidades cargadas:', unidades.value);
      } else {
        console.error('Error al cargar unidades:', unitsResponse?.message || 'No se proporcionó un mensaje de error.');
        unidades.value = [];
      }
    } catch (error) {
      console.error('Excepción al cargar unidades:', error);
      unidades.value = [];
    }
  } else {
    unidades.value = []; // Limpiar unidades si se selecciona "Todas las materias"
  }
});

// Activar la edición de una celda
const editCalification = (idAlumno: number, idUnidad: number) => {
  editingCell.value = `${idAlumno}-${idUnidad}`;
  const key = `${idAlumno}-${idUnidad}`;
  originalCalification.value = calificaciones.value[key] ?? null; // Guardar la calificación original
  tempCalification.value = calificaciones.value[key] ?? null; // Inicializar la calificación temporal
};

// Guardar la calificación en el backend
const saveCalification = async (idAlumno: number, idUnidad: number) => {
  const key = `${idAlumno}-${idUnidad}`;
  const calificacion = tempCalification.value;

  // Solo enviar el POST si hay una calificación válida
  if (calificacion !== null && calificacion >= 0 && calificacion <= 10) {
    try {
      const calificationData: ICalifications = {
        id: 0,
        calificacion: calificacion,
        idAlumno: idAlumno,
        idUnidad: idUnidad,
      };
      console.log('Enviando calificación:', calificationData);
      const response = await calificationsStore.PostStoreCalification(calificationData);
      if (response?.success) {
        console.log('Calificación guardada exitosamente:', response.data);
        calificaciones.value[key] = calificacion;
      } else {
        console.error('Error al guardar la calificación:', response?.message);
      }
    } catch (error) {
      console.error('Excepción al guardar la calificación:', error);
    }
  }
  editingCell.value = null;
  tempCalification.value = null;
  originalCalification.value = null;
};

// Cancelar la edición
const cancelEdit = () => {
  const key = editingCell.value;
  if (key && originalCalification.value !== null) {
    calificaciones.value[key] = originalCalification.value; // Revertir al valor original
  }
  editingCell.value = null; // Cerrar el input
  tempCalification.value = null;
  originalCalification.value = null;
};

// Calcular el promedio por materia para un alumno
const calculateAverageForMateria = (idAlumno: number, idMateria: number) => {
  if (!idMateria) return null;

  const units = materiaUnidades.value[idMateria] || [];
  const studentCalifications = units
    .map(unit => calificaciones.value[`${idAlumno}-${unit.id}`])
    .filter(cal => cal !== undefined && cal >= 0 && cal <= 10);

  if (studentCalifications.length === 0) return null;
  const sum = studentCalifications.reduce((acc, cal) => acc + cal, 0);
  return (sum / studentCalifications.length).toFixed(1);
};

// Calcular el promedio general por alumno
const calculateGeneralAverage = (idAlumno: number) => {
  // Obtener todas las unidades visibles (de las materias que se están mostrando)
  const visibleUnits = Object.values(materiaUnidades.value).flat(); // Todas las unidades de las materias visibles
  const visibleUnitIds = visibleUnits.map(unit => unit.id);

  // Filtrar las calificaciones del alumno para que solo incluyan las unidades visibles
  const studentCalifications = Object.keys(calificaciones.value)
    .filter(key => {
      const [alumnoId, unidadId] = key.split('-').map(Number);
      return alumnoId === idAlumno && visibleUnitIds.includes(unidadId);
    })
    .map(key => calificaciones.value[key])
    .filter(cal => cal !== undefined && cal >= 0 && cal <= 10);

  if (studentCalifications.length === 0) return null;
  const sum = studentCalifications.reduce((acc, cal) => acc + cal, 0);
  return (sum / studentCalifications.length).toFixed(1);
};

// Función para determinar la clase de color según la calificación
const getCalificacionClass = (calificacion: any) => {
  if (calificacion === '-' || calificacion === null || calificacion === undefined) return '';
  const cal = typeof calificacion === 'string' ? parseFloat(calificacion) : calificacion;
  if (cal >= 9) return 'bg-green-50 text-green-700';
  if (cal >= 7) return 'bg-blue-50 text-blue-700';
  if (cal >= 6) return 'bg-yellow-50 text-yellow-700';
  return 'bg-red-50 text-red-700';
};

onMounted(async () => {
  if (!groupId.value || isNaN(groupId.value)) {
    console.error('No se proporcionó un ID de grupo válido en la ruta:', route.params.id);
    return;
  }
  await fetchData();
});
</script>

<style scoped>
.sistema-calificaciones {
  max-width: 1400px;
}

.alumnos-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.alumnos-table th,
.alumnos-table td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
}

.alumnos-table th:last-child,
.alumnos-table td:last-child {
  border-right: none;
}

.alumnos-table th {
  background-color: #f3f4f6;
  color: #1f2937;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.alumnos-table td {
  color: #374151;
  font-size: 0.9rem;
}

.alumnos-table tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

.alumnos-table tbody tr:hover {
  background-color: #f1f5f9;
}

:deep(.p-select) {
  border-color: #d1d5db !important;
  font-size: 0.85rem !important;
}

:deep(.p-select .p-select-label) {
  color: #374151 !important;
  padding: 0.25rem 0.5rem !important;
}

.text-red-500 {
  color: #ef4444;
}

.sticky {
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: inherit;
}

.calificacion-celda {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.calificacion-celda:hover .calificacion-menu,
.calificacion-celda:focus-within .calificacion-menu {
  display: flex;
  opacity: 1;
}

.calificacion-menu {
  display: none;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.calification-input {
  width: 60px;
  padding: 0.25rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
}

.calification-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

h1 {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #2D3748;
}

p, span {
  font-family: 'Roboto', sans-serif;
}
</style>

<template>
  <div class="sistema-calificaciones">
    <!-- Cabecera con filtros -->
    <div class="flex flex-column md:flex-row justify-content-between gap-3 mb-4">
      <div class="flex flex-column sm:flex-row gap-2 align-items-center">
        <Dropdown v-model="grupoSeleccionado" :options="grupos" optionLabel="nombre" optionValue="id" placeholder="Seleccionar grupo" class="w-full sm:w-14rem" />
        <Dropdown v-model="materiaSeleccionada" :options="materiasFiltradas" optionLabel="nombre" optionValue="id" placeholder="Todas las materias" class="w-full sm:w-14rem" />
        <Select v-model="alumnoSeleccionado" :options="alumnosFiltrados" showClear optionLabel="nombre" placeholder="Buscar alumno..." class="w-full sm:w-14rem" />
      </div>
    </div>

    <!-- Tabla de calificaciones -->
    <Card class="p-0">
      <template #content>
        <div class="overflow-x-auto">
          <DataTable :value="alumnosFiltrados" stripedRows class="p-datatable-sm">
            <Column field="nombre" header="ALUMNO" frozen class="font-bold min-w-12rem" />
            <template v-for="materia in materiasFiltradas" :key="materia.id">
              <template v-if="!materiaSeleccionada || materia.id === materiaSeleccionada">
                <template v-for="unidad in unidadesPorMateria(materia.id)" :key="unidad.id">
                  <Column :header="unidad.nombre" class="text-center p-2 border-left-1 border-gray-200">
                    <template #body="{ data }">
                      <div class="calificacion-celda relative" :class="getCalificacionClass(obtenerCalificacion(data.id, materia.id, unidad.id))">
                        <span class="block w-full h-full py-1 px-2">
                          {{ obtenerCalificacion(data.id, materia.id, unidad.id) === '-' ? '-' : obtenerCalificacion(data.id, materia.id, unidad.id) }}
                        </span>
                        <!-- Menú que aparece al pasar el cursor o al hacer focus -->
                        <div class="calificacion-menu absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center bg-white bg-opacity-90" tabindex="0" @click.stop>
                          <div v-if="obtenerCalificacion(data.id, materia.id, unidad.id) !== '-'" class="flex gap-1 p-1">
                            <button class="text-blue-500 hover:text-blue-700" aria-label="Editar calificación"><i class="pi pi-file-edit text-sm"></i></button>
                            <button class="text-gray-500 hover:text-gray-700" aria-label="Agregar calificación"><i class="pi pi-file-plus text-sm"></i></button>
                            <button class="text-gray-500 hover:text-gray-700" aria-label="Guardar cambios"><i class="pi pi-save text-sm"></i></button>
                            <button class="text-gray-500 hover:text-gray-700" aria-label="Cerrar menú"><i class="pi pi-times text-sm"></i></button>
                          </div>
                          <div v-else class="flex gap-1 p-1">
                            <button class="text-gray-500 hover:text-gray-700" aria-label="Agregar calificación"><i class="pi pi-file-edit text-sm"></i></button>
                          </div>
                        </div>
                      </div>
                    </template>
                  </Column>
                </template>
                <Column header="Prom." class="text-center p-2 border-left-1 border-gray-200">
                  <template #body="{ data }">
                    <div :class="getCalificacionClass(calcularPromedioMateria(data.id, materia.id))" class="font-medium px-2 py-1 border-round">
                      {{ calcularPromedioMateria(data.id, materia.id) }}
                    </div>
                  </template>
                </Column>
              </template>
            </template>
            <Column header="PROMEDIO GENERAL" class="text-center p-2 border-left-1 border-gray-200">
              <template #body="{ data }">
                <div :class="getCalificacionClass(calcularPromedioGeneral(data.id))" class="font-medium px-2 py-1 border-round">
                  {{ calcularPromedioGeneral(data.id) }}
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>

    <div class="text-sm text-gray-500 text-center mt-3">
      Total: {{ alumnosFiltrados.length }} alumnos | Última actualización: 26/03/2025
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Dropdown from 'primevue/dropdown';
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';

// Datos
const grupos = ref([
  { id: 1, nombre: "1° A - Primaria" },
  { id: 2, nombre: "2° B - Primaria" },
  { id: 3, nombre: "3° A - Secundaria" },
]);
const materias = ref([
  { id: 1, nombre: "Matemáticas", grupoId: 1 },
  { id: 2, nombre: "Español", grupoId: 1 },
  { id: 3, nombre: "Ciencias Naturales", grupoId: 1 },
  { id: 4, nombre: "Matemáticas", grupoId: 2 },
  { id: 5, nombre: "Historia", grupoId: 2 },
  { id: 6, nombre: "Física", grupoId: 3 },
  { id: 7, nombre: "Química", grupoId: 3 },
]);
const unidades = ref([
  { id: 1, nombre: "Unidad 1", materiaId: 1 },
  { id: 2, nombre: "Unidad 2", materiaId: 1 },
  { id: 3, nombre: "Unidad 3", materiaId: 1 },
  { id: 4, nombre: "Unidad 1", materiaId: 2 },
  { id: 5, nombre: "Unidad 2", materiaId: 2 },
  { id: 6, nombre: "Unidad 1", materiaId: 3 },
  { id: 7, nombre: "Unidad 1", materiaId: 4 },
]);
const alumnos = ref([
  { id: 1, nombre: "Ana García", grupoId: 1 },
  { id: 2, nombre: "Carlos Pérez", grupoId: 1 },
  { id: 3, nombre: "María Rodríguez", grupoId: 1 },
  { id: 4, nombre: "Juan López", grupoId: 1 },
  { id: 5, nombre: "Sofía Martínez", grupoId: 1 },
  { id: 6, nombre: "Pedro Sánchez", grupoId: 2 },
  { id: 7, nombre: "Laura Torres", grupoId: 2 },
  { id: 8, nombre: "Miguel Ramírez", grupoId: 3 },
]);
const calificaciones = ref([
  { id: 1, alumnoId: 1, materiaId: 1, unidadId: 1, calificacion: 8.5 },
  { id: 2, alumnoId: 1, materiaId: 1, unidadId: 2, calificacion: 9.0 },
  { id: 3, alumnoId: 1, materiaId: 2, unidadId: 4, calificacion: 7.8 },
  { id: 4, alumnoId: 2, materiaId: 1, unidadId: 1, calificacion: 7.5 },
  { id: 5, alumnoId: 2, materiaId: 1, unidadId: 2, calificacion: 8.0 },
  { id: 6, alumnoId: 2, materiaId: 2, unidadId: 4, calificacion: 8.2 },
  { id: 7, alumnoId: 3, materiaId: 1, unidadId: 1, calificacion: 9.5 },
  { id: 8, alumnoId: 3, materiaId: 1, unidadId: 2, calificacion: 9.0 },
  { id: 9, alumnoId: 3, materiaId: 2, unidadId: 4, calificacion: 9.3 },
  { id: 10, alumnoId: 4, materiaId: 1, unidadId: 1, calificacion: 6.5 },
  { id: 11, alumnoId: 4, materiaId: 1, unidadId: 2, calificacion: 7.0 },
  { id: 12, alumnoId: 4, materiaId: 2, unidadId: 4, calificacion: 7.2 },
  { id: 13, alumnoId: 5, materiaId: 1, unidadId: 1, calificacion: 8.0 },
  { id: 14, alumnoId: 5, materiaId: 1, unidadId: 2, calificacion: 8.5 },
  { id: 15, alumnoId: 5, materiaId: 2, unidadId: 4, calificacion: 8.7 },
  { id: 16, alumnoId: 6, materiaId: 4, unidadId: 7, calificacion: 7.8 },
  { id: 17, alumnoId: 7, materiaId: 4, unidadId: 7, calificacion: 8.9 },
  { id: 18, alumnoId: 8, materiaId: 6, unidadId: 1, calificacion: 9.2 },
]);

// Estados
const grupoSeleccionado = ref(1);
const materiaSeleccionada = ref(null);
const alumnoSeleccionado = ref(null);

// Computed
const materiasFiltradas = computed(() => materias.value.filter(m => m.grupoId === grupoSeleccionado.value));
const alumnosFiltrados = computed(() => {
  const filtered = alumnos.value.filter(a => a.grupoId === grupoSeleccionado.value);
  if (alumnoSeleccionado.value) {
    return filtered.filter(a => a.id === alumnoSeleccionado.value.id);
  }
  return filtered;
});

// Métodos
const unidadesPorMateria = (materiaId: number) => unidades.value.filter(u => u.materiaId === materiaId);

const obtenerCalificacion = (alumnoId: number, materiaId: number, unidadId: number) => {
  const c = calificaciones.value.find(c => c.alumnoId === alumnoId && c.materiaId === materiaId && c.unidadId === unidadId);
  return c ? c.calificacion : '-';
};

const calcularPromedioMateria = (alumnoId: number, materiaId: number) => {
  const cs = calificaciones.value.filter(c => c.alumnoId === alumnoId && c.materiaId === materiaId);
  return cs.length ? (cs.reduce((acc: number, c: any) => acc + c.calificacion, 0) / cs.length).toFixed(1) : '-';
};

const calcularPromedioGeneral = (alumnoId: number) => {
  const cs = calificaciones.value.filter(c => c.alumnoId === alumnoId);
  return cs.length ? (cs.reduce((acc: number, c: any) => acc + c.calificacion, 0) / cs.length).toFixed(1) : '-';
};

const getCalificacionClass = (calificacion: any) => {
  if (calificacion === '-') return '';
  const cal = typeof calificacion === 'string' ? parseFloat(calificacion) : calificacion;
  if (cal >= 9) return 'bg-green-50 text-green-700';
  if (cal >= 7) return 'bg-blue-50 text-blue-700';
  if (cal >= 6) return 'bg-yellow-50 text-yellow-700';
  return 'bg-red-50 text-red-700';
};
</script>

<style>
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f3f4f6 !important;
  color: #1f2937 !important;
  font-weight: 600;
  font-size: 0.85rem !important;
  padding: 0.5rem !important;
  min-width: 60px !important;
}
:deep(.p-datatable .p-datatable-tbody > tr) {
  background-color: #ffffff !important;
}
:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background-color: #f9fafb !important;
}
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  color: #374151 !important;
  padding: 0 !important;
  font-size: 0.85rem !important;
  min-width: 60px !important;
  min-height: 32px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
:deep(.p-dropdown) {
  border-color: #d1d5db !important;
  font-size: 0.85rem !important;
}
:deep(.p-dropdown .p-dropdown-label) {
  color: #374151 !important;
  padding: 0.25rem 0.5rem !important;
}
:deep(.p-select) {
  border-color: #d1d5db !important;
  font-size: 0.85rem !important;
}
:deep(.p-select .p-select-label) {
  color: #374151 !important;
  padding: 0.25rem 0.5rem !important;
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
</style>

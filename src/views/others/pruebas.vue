<template>
  <AppLayout>
    <div class="container mx-auto p-6">
      <!-- Encabezado -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <Button icon="pi pi-arrow-left" class="p-button-text p-button-rounded p-button-lg mr-3" @click="goBack" />
          <div>
            <h2 class="text-3xl font-bold text-gray-800">
              {{ group?.nombre || 'Cargando...' }} - Informática
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              {{ enrolledStudents.length }} de {{ availableStudents.length + enrolledStudents.length }} alumnos
              inscritos
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <InputText v-model="searchQuery" placeholder="Buscar alumno..." class="p-inputtext-sm" style="width: 220px" />
          <Dropdown v-model="itemsPerPage" :options="[10, 20, 30]" placeholder="Mostrar" class="p-dropdown-sm"
            style="width: 120px" />
        </div>
      </div>

      <!-- Contenido principal -->
      <div v-if="loading">Cargando...</div>
      <div v-else-if="!group">Grupo no encontrado</div>
      <div v-else class="grid grid-cols-2 gap-6">
        <!-- Alumnos Disponibles -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-800">
              Alumnos Disponibles
              <span class="text-gray-500 text-sm">({{ availableStudents.length }})</span>
            </h3>
            <div class="flex items-center">
              <Checkbox v-model="selectAllAvailable" :binary="true" @change="toggleSelectAllAvailable" />
              <span class="ml-2 text-sm text-gray-600">Seleccionar todos</span>
            </div>
          </div>

          <DataTable :value="paginatedAvailable" :rows="itemsPerPage" class="p-datatable-sm" :rowHover="true"
            v-model:selection="selectedAvailable" dataKey="id">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="nombreCompleto" header="Nombre">
              <template #body="{ data }">
                <div>
                  <p class="font-medium text-gray-800">{{ data.nombreCompleto }}</p>
                  <p class="text-sm text-gray-500">{{ data.email }}</p>
                </div>
              </template>
            </Column>
            <Column field="matricula" header="Matrícula" headerStyle="width: 8rem">
              <template #body="{ data }">
                <span class="text-gray-700">{{ data.matricula }}</span>
              </template>
            </Column>
          </DataTable>

          <!-- Paginación -->
          <Paginator v-model:first="firstAvailable" :rows="itemsPerPage" :totalRecords="availableStudents.length"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" class="mt-4" />
        </div>

        <!-- Alumnos Inscritos -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-800">
              Alumnos Inscritos
              <span class="text-gray-500 text-sm">({{ enrolledStudents.length }})</span>
            </h3>
            <div class="flex items-center">
              <Checkbox v-model="selectAllEnrolled" :binary="true" @change="toggleSelectAllEnrolled" />
              <span class="ml-2 text-sm text-gray-600">Seleccionar todos</span>
            </div>
          </div>

          <DataTable :value="paginatedEnrolled" :rows="itemsPerPage" class="p-datatable-sm" :rowHover="true"
            v-model:selection="selectedEnrolled" dataKey="id">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="nombreCompleto" header="Nombre">
              <template #body="{ data }">
                <div>
                  <p class="font-medium text-gray-800">{{ data.nombreCompleto }}</p>
                  <p class="text-sm text-gray-500">{{ data.email }}</p>
                </div>
              </template>
            </Column>
            <Column field="matricula" header="Matrícula" headerStyle="width: 8rem">
              <template #body="{ data }">
                <span class="text-gray-700">{{ data.matricula }}</span>
              </template>
            </Column>
          </DataTable>

          <!-- Paginación -->
          <Paginator v-model:first="firstEnrolled" :rows="itemsPerPage" :totalRecords="enrolledStudents.length"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" class="mt-4" />
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-between mt-6">
        <Button label="Añadir al grupo" icon="pi pi-plus" class="p-button-raised p-button-success text-sm"
          @click="addToGroup" :disabled="!selectedAvailable.length" />
        <Button label="Quitar del grupo" icon="pi pi-minus" class="p-button-raised p-button-danger text-sm"
          @click="removeFromGroup" :disabled="!selectedEnrolled.length" />
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GetGroup } from '@/utils/helpers';
import { useGroupsStudentStore } from '@/stores/GroupsStudentStore';
import type { Groups } from '@/types/Groups';
import type { IStudent } from '@/types/Students';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import Paginator from 'primevue/paginator';
import AppLayout from '@/layout/AppLayout.vue';

const route = useRoute();
const router = useRouter();
const group = ref<Groups | null>(null);
const loading = ref(true);
const availableStudentsList = ref<IStudent[]>([]);
const enrolledStudentsList = ref<IStudent[]>([]);
const selectedAvailable = ref<IStudent[]>([]);
const selectedEnrolled = ref<IStudent[]>([]);
const selectAllAvailable = ref(false);
const selectAllEnrolled = ref(false);
const searchQuery = ref<string>('');
const itemsPerPage = ref<number>(10);
const firstAvailable = ref<number>(0);
const firstEnrolled = ref<number>(0);

const groupsStudentStore = useGroupsStudentStore();

const fetchGroup = async (id: number) => {
  try {
    const response = await GetGroup(id);
    group.value = response?.success ? response.data : null;
  } catch (error) {
    console.error('Error al cargar el grupo:', error);
    group.value = null;
  }
};

const fetchStudents = async (groupId: number) => {
  try {
    const sinGrupoResponse = await groupsStudentStore.GetStoreGroupsStudentsWhithoutGroup();
    availableStudentsList.value = sinGrupoResponse?.success ? sinGrupoResponse.data : [];
    const conGrupoResponse = await groupsStudentStore.GetStoreGroupsStudentsWhithGroup(groupId);
    enrolledStudentsList.value = conGrupoResponse?.success ? conGrupoResponse.data : [];
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    availableStudentsList.value = [];
    enrolledStudentsList.value = [];
  } finally {
    loading.value = false;
  }
};

const availableStudents = computed(() => {
  return availableStudentsList.value.map((student) => ({
    ...student,
    email: `${student.nombreCompleto.toLowerCase().replace(/\s/g, '.')}@ejemplo.com`,
  }));
});

const enrolledStudents = computed(() => {
  return enrolledStudentsList.value.map((student) => ({
    ...student,
    email: `${student.nombreCompleto.toLowerCase().replace(/\s/g, '.')}@ejemplo.com`,
  }));
});

const paginatedAvailable = computed(() => {
  const start = firstAvailable.value;
  const end = start + itemsPerPage.value;
  return availableStudents.value.slice(start, end);
});

const paginatedEnrolled = computed(() => {
  const start = firstEnrolled.value;
  const end = start + itemsPerPage.value;
  return enrolledStudents.value.slice(start, end);
});

const toggleSelectAllAvailable = () => {
  if (selectAllAvailable.value) {
    selectedAvailable.value = [...paginatedAvailable.value];
  } else {
    selectedAvailable.value = [];
  }
};

const toggleSelectAllEnrolled = () => {
  if (selectAllEnrolled.value) {
    selectedEnrolled.value = [...paginatedEnrolled.value];
  } else {
    selectedEnrolled.value = [];
  }
};

const addToGroup = async () => {
  try {
    const groupId = Number(route.params.id);
    const selectedIds = selectedAvailable.value.map((student) => student.id);

    if (!selectedIds.length) {
      console.warn('No hay alumnos seleccionados');
      return;
    }

    const response = await groupsStudentStore.PostStoreAlumnosaGrupo(groupId, selectedIds);

    if (response?.success) {
      await fetchStudents(groupId);
      selectedAvailable.value = [];
      selectAllAvailable.value = false;
    } else {
      console.error('Error al añadir alumnos:', response?.message);
    }
  } catch (error) {
    console.error('Error al añadir alumnos:', error);
  }
};

const removeFromGroup = async () => {
  try {
    const groupId = Number(route.params.id);
    const selectedIds = selectedEnrolled.value.map((student) => student.id);

    if (!selectedIds.length) {
      console.warn('No hay alumnos seleccionados para quitar');
      return;
    }

    for (const studentId of selectedIds) {
      const groupStudent = enrolledStudentsList.value.find((gs) => gs.id === studentId);
      if (groupStudent) {
        await groupsStudentStore.DeleteStoreGroupsStudent(groupStudent.id, selectedIds);
      }
    }
    await fetchStudents(groupId);
    selectedEnrolled.value = [];
    selectAllEnrolled.value = false;
  } catch (error) {
    console.error('Error al quitar alumnos:', error);
  }
};

const goBack = () => {
  router.push('/groups');
};

onMounted(async () => {
  const groupId = Number(route.params.id);
  await Promise.all([fetchGroup(groupId), fetchStudents(groupId)]);
});
</script>

<style scoped>
/* Ajustes de estilo para mejorar la apariencia */
.container {
  max-width: 1400px;
}

/* Estilo del título */
h2 {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #2D3748;
}

/* Estilo de los subtítulos */
h3 {
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
}

/* Ajustes de las tablas */
.p-datatable .p-datatable-thead>tr>th {
  background-color: #D4EFDF !important;
  color: #2D3748;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.p-datatable .p-datatable-tbody>tr {
  transition: background-color 0.2s;
}

.p-datatable .p-datatable-tbody>tr:hover {
  background-color: #F1F5F9 !important;
}

/* Estilo de los botones */
.p-button-success {
  background-color: #28A745 !important;
  border-color: #28A745 !important;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  padding: 0.5rem 1.5rem;
}

.p-button-danger {
  background-color: #DC3545 !important;
  border-color: #DC3545 !important;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  padding: 0.5rem 1.5rem;
}

/* Estilo de la paginación */
.p-paginator {
  background-color: #F8F9FA !important;
  border: none;
}

.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background-color: #28A745 !important;
  color: white !important;
  border-radius: 50%;
}

/* Ajustes de espaciado y sombras */
.shadow-lg {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Ajustes de tipografía general */
p,
span {
  font-family: 'Roboto', sans-serif;
}
</style>

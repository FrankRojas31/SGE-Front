<template>
  <AppLayout>
    <div class="container mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <Button
            icon="pi pi-arrow-left"
            class="p-button-text p-button-rounded p-button-lg mr-3"
            @click="goBack"
          />
          <div>
            <h2 class="text-3xl font-bold text-gray-800">
              {{ group?.nombre || 'Cargando...' }} - Añadir Materias
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              {{ enrolledSubjects.length }} de {{ availableSubjects.length + enrolledSubjects.length }} Materias Agregadas
            </p>
          </div>
        </div>
      </div>

      <div v-if="loading">Cargando...</div>
      <div v-else-if="!group">Grupo no encontrado</div>
      <div v-else class="grid grid-cols-2 gap-6">
        <div class="bg-white shadow-lg rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-800">
              Materias Disponibles
              <span class="text-gray-500 text-sm">({{ availableSubjects.length }})</span>
            </h3>
          </div>

          <DataTable
            :value="availableSubjects"
            :rows="itemsPerPage"
            class="p-datatable-sm"
            :rowHover="true"
            v-model:selection="selectedAvailable"
            dataKey="id"
            :paginator="true"
            v-model:first="firstAvailable"
            @page="onPageAvailable($event)"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          >
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="nombre" header="Nombre de la Materia">
              <template #body="{ data }">
                <p class="font-medium text-gray-800">{{ data.nombre }}</p>
              </template>
            </Column>
            <Column field="descripcion" header="Descripción" headerStyle="width: 8rem">
              <template #body="{ data }">
                <span class="text-gray-700">{{ data.descripcion || 'Sin descripción' }}</span>
              </template>
            </Column>
            <template #empty>
              <div class="text-center p-4 text-gray-600 empty-table-placeholder">
                No hay materias disponibles
              </div>
            </template>
          </DataTable>
        </div>

        <div class="bg-white shadow-lg rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-800">
              Materias Agregadas
              <span class="text-gray-500 text-sm">({{ enrolledSubjects.length }})</span>
            </h3>
          </div>

          <DataTable
            :value="enrolledSubjects"
            :rows="itemsPerPage"
            class="p-datatable-sm"
            :rowHover="true"
            v-model:selection="selectedEnrolled"
            dataKey="id"
            :paginator="true"
            v-model:first="firstEnrolled"
            @page="onPageEnrolled($event)"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll"
            :rowsPerPageOptions="[5, 10, 15, 25]"
          >
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="nombre" header="Nombre de la Materia">
              <template #body="{ data }">
                <p class="font-medium text-gray-800">{{ data.nombre }}</p>
              </template>
            </Column>
            <Column field="descripcion" header="Descripción" headerStyle="width: 8rem">
              <template #body="{ data }">
                <span class="text-gray-700">{{ data.descripcion || 'Sin descripción' }}</span>
              </template>
            </Column>
            <template #empty>
              <div class="text-center p-4 text-gray-600 empty-table-placeholder">
                No hay materias disponibles
              </div>
            </template>
          </DataTable>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-between mt-6">
        <Button
          label="Añadir al grupo"
          icon="pi pi-plus"
          class="p-button-raised p-button-success text-sm"
          @click="addToGroup"
          :disabled="!selectedAvailable.length"
        />
        <Button
          label="Quitar del grupo"
          icon="pi pi-minus"
          class="p-button-raised p-button-danger text-sm"
          @click="removeFromGroup"
          :disabled="!selectedEnrolled.length"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GetGroup } from '@/utils/helpers';
import { useGroupsSubjectStore } from '@/stores/GroupsSubjectsStore';
import type { Groups } from '@/types/Groups';
import type { IGroupsSubjects } from '@/types/GroupsSubjects';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AppLayout from '@/layout/AppLayout.vue';

const route = useRoute();
const router = useRouter();
const group = ref<Groups | null>(null);
const loading = ref(true);
const availableSubjectsList = ref<IGroupsSubjects[]>([]);
const enrolledSubjectsList = ref<IGroupsSubjects[]>([]);
const selectedAvailable = ref<IGroupsSubjects[]>([]);
const selectedEnrolled = ref<IGroupsSubjects[]>([]);
const itemsPerPage = ref<number>(5);
const firstAvailable = ref<number>(0);
const firstEnrolled = ref<number>(0);

const groupsSubjectStore = useGroupsSubjectStore();

const fetchGroup = async (id: number) => {
  try {
    const response = await GetGroup(id);
    group.value = response?.success ? response.data : null;
  } catch (error) {
    console.error('Error al cargar el grupo:', error);
    group.value = null;
  }
};

const fetchSubjects = async (groupId: number) => {
  try {
    const sinGrupoResponse = await groupsSubjectStore.GetStoreGroupsSubjectsWithoutGroup(groupId);
    availableSubjectsList.value = sinGrupoResponse?.success ? sinGrupoResponse.data : [];

    const conGrupoResponse = await groupsSubjectStore.GetStoreGroupsSubjectsWithGroup(groupId);
    enrolledSubjectsList.value = conGrupoResponse?.success ? conGrupoResponse.data : [];
  } catch (error) {
    console.error('Error al cargar las materias:', error);
    availableSubjectsList.value = [];
    enrolledSubjectsList.value = [];
  } finally {
    loading.value = false;
  }
};

const availableSubjects = computed(() => availableSubjectsList.value);
const enrolledSubjects = computed(() => enrolledSubjectsList.value);

// Manejadores de eventos de paginación
const onPageAvailable = (event: any) => {
  firstAvailable.value = event.first;
  selectedAvailable.value = []; // Limpiar selección al cambiar de página
};

const onPageEnrolled = (event: any) => {
  firstEnrolled.value = event.first;
  selectedEnrolled.value = []; // Limpiar selección al cambiar de página
};

const addToGroup = async () => {
  try {
    const groupId = Number(route.params.id);
    const selectedIds = selectedAvailable.value.map((subject) => subject.id);

    if (!selectedIds.length) {
      console.warn('No hay materias seleccionadas');
      return;
    }

    const response = await groupsSubjectStore.PostStoreMateriasaGrupo(groupId, selectedIds);
    if (response?.success) {
      await fetchSubjects(groupId);
      selectedAvailable.value = [];
    }
  } catch (error) {
    console.error('Error al añadir materias:', error);
  }
};

const removeFromGroup = async () => {
  try {
    const groupId = Number(route.params.id);
    const selectedIds = selectedEnrolled.value.map((subject) => subject.id);
    await groupsSubjectStore.DeleteStoreGroupsSubjects(groupId, selectedIds);
    await fetchSubjects(groupId);
    selectedEnrolled.value = [];
  } catch (error) {
    console.error('Error al quitar materias:', error);
  }
};

const goBack = () => {
  router.push('/groups');
};

onMounted(async () => {
  const groupId = Number(route.params.id);
  await Promise.all([fetchGroup(groupId), fetchSubjects(groupId)]);
});
</script>

<style scoped>
/* Ajustes de estilo para mejorar la apariencia */
.container {
  max-width: 1400px;
}

.empty-table-placeholder {
  min-height: 175px;
  display: flex;
  align-items: center;
  justify-content: center;
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
.p-datatable .p-datatable-thead > tr > th {
  background-color: #D4EFDF !important;
  color: #2D3748;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.p-datatable .p-datatable-tbody > tr {
  transition: background-color 0.2s;
}

.p-datatable .p-datatable-tbody > tr:hover {
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
p, span {
  font-family: 'Roboto', sans-serif;
}
</style>

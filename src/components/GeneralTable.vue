<script lang="ts" setup>
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

interface ColumnConfig<T> {
  field: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
}

interface TableData {
  id: number | string;
  [key: string]: any;
}

const props = defineProps<{
  title: string;
  data: TableData[];
  columns: ColumnConfig<TableData>[];
  loading?: boolean;
  disabledCreate?: boolean;
}>();

defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
  (e: 'create'): void;
  (e: 'id', id: number): void
}>();

// Estados reactivos
const globalFilter = ref('');
const rowsPerPage = ref(7);

// Computeds para filtrado
const filteredData = computed(() => {
  if (!globalFilter.value) return props.data;

  const searchTerm = globalFilter.value.toLowerCase();
  return props.data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );
});

const tableAriaLabel = 'Tabla de datos interactiva';



</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-2 py-6">
    <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:leading-tight transition-all duration-200">
      {{ props.title }}
    </h2>
    <div class="flex flex-col sm:flex-row justify-end items-center mb-6 gap-4">
      <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <IconField class="w-full max-w-[20rem]">
          <InputIcon class="pi pi-search" />
          <InputText v-model="globalFilter" placeholder="Buscar..."
            class="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            aria-label="Campo de búsqueda global" />
        </IconField>

        <Button label="Nuevo" icon="pi pi-plus" class="p-button-raised p-button-success w-full sm:w-auto min-w-[100px]"
          @click="$emit('create')" aria-label="Crear nuevo registro" :disabled="props.disabledCreate" />
      </div>
    </div>

    <div class="card bg-white rounded-md shadow-sm overflow-hidden">
      <div v-if="props.loading" class="py-4 text-center text-gray-500 flex items-center justify-center gap-2">
        <i class="pi pi-spin pi-spinner" />
        Cargando datos...
      </div>

      <DataTable v-else :value="filteredData" :rows="rowsPerPage" paginator responsiveLayout="scroll" dataKey="id"
        class="p-datatable-sm" :aria-label="tableAriaLabel" :paginatorTemplate="{
          layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
          CurrentPageReport: 'Mostrando {first} a {last} de {totalRecords} registros'
        }" :rowsPerPageOptions="[5, 10, 15, 25]">
        <template #empty v-if="filteredData.length === 0">
          <div class="py-4 text-center text-gray-500">
            No se encontraron registros que coincidan con la búsqueda
          </div>
        </template>

        <Column v-for="col in columns" :key="col.field as string" :field="col.field as string" :header="col.header"
          :sortable="col.sortable ?? false" :filterable="col.filterable ?? false"
          headerClass="bg-gray-50 text-gray-700 font-semibold" class="text-sm">
          <template #body="{ data }">
            <span class="truncate block">{{ data[col.field] }}</span>
          </template>
        </Column>

        <Column header="Acciones">
          <template #body="{ data }">
            <slot name="customButton" :data="data" />
            <Button v-tooltip="'Editar'" class="mr-2" icon="pi pi-pencil" severity="success" rounded raised
              @click="$emit('edit', data.id)" aria-label="Editar registro" />
            <Button v-tooltip="'Eliminar'" icon="pi pi-trash" severity="danger" rounded raised
              @click="$emit('delete', data.id)" aria-label="Eliminar registro" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .p-datatable {
    font-size: 0.875rem;
  }

  .p-button {
    padding: 0.5rem;
  }
}


.p-button-success {
  background-color: #10b981;
  border-color: #10b981;
}

.p-button-success:hover {
  background-color: #059669;
  border-color: #059669;
}

@media (max-width: 640px) {
  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  h2 {
    font-size: 1.875rem;
  }
}
</style>

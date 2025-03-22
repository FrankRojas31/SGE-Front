<script lang="ts" setup>
import { ref } from 'vue';
import GeneralTable from '@/components/GeneralTable.vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import AppLayout from '@/layout/AppLayout.vue';
import type { Courses } from '@/types/SchoolYear'; // Importamos el tipo desde types.ts
// Importamos el tipo desde types.ts

// Definimos el tipo de los datos y columnas fuera de las variables reactivas
type CourseEntity = Courses;

// Datos iniciales tipados
const dataEntity = ref<CourseEntity[]>([
  { id: 1, name: '2024', description: '22393278' },
  { id: 2, name: '2025', description: '22393277' },
  { id: 3, name: '2026', description: '22393278' },
]);

// Columnas tipadas
const columns: { field: keyof CourseEntity; header: string }[] = [
  { field: 'name', header: 'Nombre' },
  { field: 'description', header: 'Descripción' },
];

// Variables reactivas tipadas con CourseEntity
const showCreateModal = ref(false);
const showEditModal = ref(false);
const newItem = ref<CourseEntity>({} as CourseEntity); // Tipo definido fuera
const editItem = ref<CourseEntity>({} as CourseEntity); // Tipo definido fuera
const currentEditId = ref<number | null>(null);

// Funciones
const openCreateModal = () => {
  newItem.value = {
    id: dataEntity.value.length + 1,
    name: '',
    description: ''
  };
  showCreateModal.value = true;
};

const handleCreate = () => {
  if (newItem.value.name) {
    dataEntity.value.push({ ...newItem.value });
    console.log(`Registro creado con ID: ${newItem.value.id}`);
  }
  showCreateModal.value = false;
};

const openEditModal = (id: number) => {
  const item = dataEntity.value.find(item => item.id === id);
  if (item) {
    editItem.value = { ...item };
    currentEditId.value = id;
    showEditModal.value = true;
  }
};

const handleEdit = () => {
  const index = dataEntity.value.findIndex(item => item.id === currentEditId.value);
  if (index !== -1) {
    dataEntity.value[index] = { ...editItem.value };
    console.log(`Registro editado con ID: ${currentEditId.value}`);
  }
  showEditModal.value = false;
};

const handleDelete = (id: number) => {
  dataEntity.value = dataEntity.value.filter(item => item.id !== id);
  console.log(`Registro eliminado con ID: ${id}`);
};
</script>

<template>
  <AppLayout>
    <div class="p-6">
      <GeneralTable :title="'Cursos Escolares'" :data="dataEntity" :columns="columns" @edit="openEditModal"
        @delete="handleDelete" @create="openCreateModal" />

      <!-- Inicio: Modal para Crear -->
      <Dialog v-model:visible="showCreateModal" header="Crear Registro" :modal="true" class="rounded-lg shadow-lg">
        <div v-for="column in columns" :key="column.field" class="mb-4">
          <label :for="column.field" class="block text-gray-600 font-medium">{{ column.header }}</label>
          <InputText :id="column.field" v-model="newItem[column.field]"
            class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" />
        </div>
        <template #footer>
          <Button label="Cancelar" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            @click="showCreateModal = false" />
          <Button label="Crear" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            @click="handleCreate" />
        </template>
      </Dialog>
      <!-- Final: Modal para Crear-->

      <!-- Modal para Editar -->
      <Dialog v-model:visible="showEditModal" header="Editar Registro" :modal="true" class="rounded-lg shadow-lg">
        <div v-for="column in columns" :key="column.field" class="mb-4">
          <label :for="column.field" class="block text-gray-600 font-medium">{{ column.header }}</label>
          <InputText :id="column.field" v-model="editItem[column.field]"
            class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" />
        </div>
        <template #footer>
          <Button label="Cancelar" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            @click="showEditModal = false" />
          <Button label="Guardar" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            @click="handleEdit" />
        </template>
      </Dialog>
    </div>
  </AppLayout>
</template>

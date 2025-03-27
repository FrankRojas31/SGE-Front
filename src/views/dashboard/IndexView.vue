<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import CardsDashboard from '@/components/crud/dashboard/CardsDashboard.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useStudentStore } from '@/stores/StudentStore';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ICardsDashboard {
  title: string;
  value: string;
  icon: string;
  iconColor: string;
  bgColor: string;
}

const studentStore = useStudentStore();
const studentCount = ref<string>('');

onMounted(async () => {
  await studentStore.GetStoreStudents();
  studentCount.value = studentStore.studentsList.length.toString();
});

const Cards = computed<ICardsDashboard[]>(() => [
  { title: 'Estudiantes', value: studentCount.value, icon: 'pi-users', iconColor: 'text-white', bgColor: 'bg-slate-500' },
  { title: 'Profesores', value: studentCount.value, icon: 'pi-book', iconColor: 'text-white', bgColor: 'bg-slate-500' },
  { title: 'Altas Alumnos', value: studentCount.value, icon: 'pi-angle-double-up', iconColor: 'text-white', bgColor: 'bg-[#10b981]' },
  { title: 'Bajas Alumnos', value: studentCount.value, icon: 'pi-angle-double-down', iconColor: 'text-white', bgColor: 'bg-red-400' }
]);

const tableData = ref([
  { id: 1, action: 'Update', tableName: 'Estudiantes', oldValue: 'Juan Pérez', newValue: 'Juan Pérez González', user: 'Admin', userId: 101, role: 'Admin', ip: '192.168.1.1', rowVersion: 'v1', isDeleted: false, entity: 'User' },
  { id: 2, action: 'Insert', tableName: 'Cursos', oldValue: '', newValue: 'Matemáticas Avanzadas', user: 'Profesor01', userId: 102, role: 'Profesor', ip: '192.168.1.2', rowVersion: 'v1', isDeleted: false, entity: 'Course' },
]);

const chartData = ref({
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [{
    label: 'Errores',
    backgroundColor: '#10b981',
    data: [12, 19, 8, 15, 9, 14, 10]
  }]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
});
</script>

<template>
  <AppLayout>
    <div class="px-6 py-7">
      <div class="grid grid-cols-4 gap-4">
        <CardsDashboard v-for="(card, index) in Cards" :key="index" :title="card.title" :value="card.value"
          :icon="card.icon" :iconColor="card.iconColor" :bgColor="card.bgColor" />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-6">
        <!-- Tabla -->
        <div class="bg-white p-4 shadow rounded-lg overflow-auto">
          <h2 class="text-lg font-semibold mb-2">Logs de cambios</h2>
          <table class="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr class="bg-[#0f9761] text-white font-bold text-left whitespace-nowrap">
                <th class="border border-gray-300 px-2 py-1">Acción</th>
                <th class="border border-gray-300 px-2 py-1">Tabla</th>
                <th class="border border-gray-300 px-2 py-1">Valor Anterior</th>
                <th class="border border-gray-300 px-2 py-1">Nuevo Valor</th>
                <th class="border border-gray-300 px-2 py-1">Usuario</th>
                <th class="border border-gray-300 px-2 py-1">ID Usuario</th>
                <th class="border border-gray-300 px-2 py-1">Rol</th>
                <th class="border border-gray-300 px-2 py-1">IP</th>
                <th class="border border-gray-300 px-2 py-1">Versión</th>
                <th class="border border-gray-300 px-2 py-1">Borrado</th>
                <th class="border border-gray-300 px-2 py-1">Entidad</th>
              </tr>

            </thead>
            <tbody>
              <tr v-for="log in tableData" :key="log.id" class="border border-gray-300">
                <td class="px-2 py-1">{{ log.action }}</td>
                <td class="px-2 py-1">{{ log.tableName }}</td>
                <td class="px-2 py-1">{{ log.oldValue }}</td>
                <td class="px-2 py-1">{{ log.newValue }}</td>
                <td class="px-2 py-1">{{ log.user }}</td>
                <td class="px-2 py-1">{{ log.userId }}</td>
                <td class="px-2 py-1">{{ log.role }}</td>
                <td class="px-2 py-1">{{ log.ip }}</td>
                <td class="px-2 py-1">{{ log.rowVersion }}</td>
                <td class="px-2 py-1">{{ log.isDeleted ? 'Sí' : 'No' }}</td>
                <td class="px-2 py-1">{{ log.entity }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Gráfica -->
        <div class="bg-white p-4 shadow rounded-lg h-[300px]">
          <h2 class="text-lg font-semibold mb-2">Gráfica de logs semanal</h2>
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

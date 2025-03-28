<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import CardsDashboard from '@/components/crud/dashboard/CardsDashboard.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useStudentStore } from '@/stores/StudentStore';
import { useGroupsStore } from '@/stores/GroupsStore';
import { useSubjectStore } from '@/stores/SubjectStore';
import { usePeriodsStore } from '@/stores/PeriodsStore';
import { usePersonStore } from '@/stores/PersonStore';
import MessageStatic from '@/components/helpers/MessageStatic.vue'
import { GetPeriodActive } from '@/api/services/PeriodsServices.ts'
import type { IPeriods } from '@/types/Periods.ts'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ICardsDashboard {
  title: string;
  value: string;
  icon: string;
  iconColor: string;
  bgColor: string;
}

const studentStore = useStudentStore();
const groupsStore = useGroupsStore();
const subjectsStore = useSubjectStore();
const personsStore = usePersonStore();
const studentCount = ref<string>('');
const groupsCount = ref<string>('');
const subjectsCount = ref<string>('');
const personsCount = ref<string>('');
const periodNoActive = ref<boolean>(true);

onMounted(async () => {
  await studentStore.GetStoreStudents();
  await groupsStore.GetStoreGroups();
  await subjectsStore.GetStoreSubjects();
  await personsStore.GetStorePersons();
  studentCount.value = studentStore.studentsList.length.toString();
  groupsCount.value = groupsStore.groupsList.length.toString();
  subjectsCount.value = subjectsStore.subjectsList.length.toString();
  personsCount.value = personsStore.personsList.length.toString();
});

const Cards = computed<ICardsDashboard[]>(() => [
  { title: 'Estudiantes Totales', value: studentCount.value, icon: 'pi-user', iconColor: 'text-white', bgColor: 'bg-emerald-600' },
  { title: 'Grupos Totales', value: groupsCount.value, icon: 'pi-users', iconColor: 'text-white', bgColor: 'bg-emerald-600' },
  { title: 'Personas Totales', value: personsCount.value, icon: 'pi-id-card', iconColor: 'text-white', bgColor: 'bg-emerald-600' },
  { title: 'Materias Totales', value: subjectsCount.value, icon: 'pi-book', iconColor: 'text-white', bgColor: 'bg-emerald-600' },
]);

const tableData = ref([
  { id: 1, action: 'Update', tableName: 'Estudiantes', oldValue: 'Juan Pérez', newValue: 'Juan Pérez González', user: 'Admin', userId: 101, role: 'Admin', ip: '192.168.1.1', rowVersion: 'v1', isDeleted: false, entity: 'User' },
  { id: 2, action: 'Insert', tableName: 'Cursos', oldValue: '', newValue: 'Matemáticas Avanzadas', user: 'Profesor01', userId: 102, role: 'Profesor', ip: '192.168.1.2', rowVersion: 'v1', isDeleted: false, entity: 'Course' },
])

const chartData = ref({
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [{
    label: 'Cambios',
    backgroundColor: '#10b981',
    data: [12, 19, 28, 15, 9, 14, 10]
  }]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
});

onMounted(async () => {
  const response = await HandlePeriodActive();
})

const HandlePeriodActive = async () => {
  const response = await GetPeriodActive();
  if (response?.success) {
    if(response.data != null) {
      periodNoActive.value = false;
    } else {
      periodNoActive.value = true;
    }
  }
}

</script>

<template>
  <AppLayout>
    <div class="px-2 py-7">
      <div class="grid grid-cols-4 gap-4 mt-4">
        <CardsDashboard v-for="(card, index) in Cards" :key="index" :title="card.title" :value="card.value"
          :icon="card.icon" :iconColor="card.iconColor" :bgColor="card.bgColor" />
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md mb-8 mt-4">
        <h1 class="text-3xl font-semibold text-gray-800">¡Bienvenido!</h1>
        <p class="text-gray-600 mt-2 text-lg font-extralight text-justify mt-4">
          Estimado docente, le damos la más cordial bienvenida al sistema de gestión escolar. Este panel ha sido diseñado para facilitar la administración de sus actividades académicas, incluyendo la captura de calificaciones, la planificación de unidades y el seguimiento de sus materias asignadas. Le invitamos a utilizar esta herramienta con responsabilidad y precisión, contribuyendo así al desarrollo educativo de sus estudiantes. ¡Gracias por su compromiso!
        </p>
      </div>
    </div>
  </AppLayout>
</template>

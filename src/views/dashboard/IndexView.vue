<script setup lang="ts">
import CardsDashboard from '@/components/crud/dashboard/CardsDashboard.vue';
import AppLayout from '@/layout/AppLayout.vue';
import { useStudentStore } from '@/stores/StudentStore';
import { onMounted, ref, computed } from 'vue';

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
})

const Cards = computed<ICardsDashboard[]>(() => [
  {
    title: 'Estudiantes', value: studentCount.value, icon: 'pi-users', iconColor: 'text-white', bgColor: 'bg-slate-500' },
  { title: 'Profesores', value: studentCount.value, icon: 'pi-book', iconColor: 'text-white', bgColor: 'bg-slate-500' },
  { title: 'Altas Alumnos', value: studentCount.value, icon: 'pi-angle-double-up', iconColor: 'text-white', bgColor: 'bg-[#10b981]' },
  { title: 'Bajas Alumnos', value: studentCount.value, icon: 'pi-angle-double-down', iconColor: 'text-white', bgColor: 'bg-red-400' }
])



</script>

<template>
  <AppLayout>
    <div class="px-6 py-7">
      <div class="grid grid-cols-4 gap-4">
        <CardsDashboard v-for="(card, index) in Cards" :key="index" :title="card.title" :value="card.value"
          :icon="card.icon" :iconColor="card.iconColor" :bgColor="card.bgColor" :description="card.description" />
      </div>
    </div>
  </AppLayout>
</template>

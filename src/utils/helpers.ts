import { usePersonStore } from '@/stores/PersonStore';
import { useSchoolYearStore } from '@/stores/SchoolYearStore';
import { useStudentStore } from '@/stores/StudentStore';
import { usePeriodsStore } from '@/stores/PeriodsStore'
import { useSubjectStore } from '@/stores/SubjectStore';

const schoolYearStore = useSchoolYearStore();
const personStore = usePersonStore()
const studentStore = useStudentStore();
const subjectStore = useSubjectStore();
const periodsStore = usePeriodsStore();

export const GetPersons = async () => {
  return await personStore.GetStorePersons();
};

export const GetSchoolYear = async () => {
  return await schoolYearStore.GetStoreSchoolYears();
};

export const GetStudents = async () => {
  return await studentStore.GetStoreStudents();
};

export const GetPeriods = async () => {
  return await periodsStore.GetStorePeriods();
};

export const GetSubjects = async () => {
  return await subjectStore.GetStoreSubjects();
}

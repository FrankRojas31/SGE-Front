import { usePersonStore } from '@/stores/PersonStore';
import { useSchoolYearStore } from '@/stores/SchoolYearStore';
import { useStudentStore } from '@/stores/StudentStore';
import { useGroupsStore } from '@/stores/GroupsStore';
import { usePeriodsStore } from '@/stores/PeriodsStore';
import { useSubjectStore } from '@/stores/SubjectStore';
import { useCoursesStore } from '@/stores/CoursesStore';
import { useUserStore } from '@/stores/userStore';
import { useUnitsStore } from '@/stores/UnitStore';
import { useAuthStore } from '@/stores/auth/AuthStore.ts';

export const GetPersons = async () => {
  const personStore = usePersonStore();
  return await personStore.GetStorePersons();
};

export const GetUsers = async () => {
  const usersStore = useUserStore();
  return await usersStore.GetUsersStore();
};

export const GetPersonsWithOutStudent = async () => {
  const personStore = usePersonStore();
  return await personStore.GetStorePersonsWithOutStudent();
};

export const GetSchoolYear = async () => {
  const schoolYearStore = useSchoolYearStore();
  return await schoolYearStore.GetStoreSchoolYears();
};

export const GetStudents = async () => {
  const studentStore = useStudentStore();
  return await studentStore.GetStoreStudents();
};

export const GetPeriods = async () => {
  const periodsStore = usePeriodsStore();
  return await periodsStore.GetStorePeriods();
};

export const GetSubjects = async () => {
  const subjectStore = useSubjectStore();
  return await subjectStore.GetStoreSubjects();
};

export const GetGroups = async () => {
  const groupStore = useGroupsStore();
  return await groupStore.GetStoreGroups();
};

export const GetGroup = async (id: number) => {
  const groupStore = useGroupsStore();
  return await groupStore.GetStoreGroup(id);
};

export const GetCourses = async () => {
  const courseStore = useCoursesStore();
  return await courseStore.GetStoreCourses();
};

export const GetUnits = async (id: number) => {
  const UnitStore = useUnitsStore();
  return await UnitStore.GetStoreUnits(id);
};

export const AuthUser = () => {
  const authStore = useAuthStore();
  return authStore.auth.accessToken;
};

export const AuthUserId = () => {
  const authStore = useAuthStore();
  return authStore.auth.id;
};

export const PeriodActive = async () => {
  const periodsStore = usePeriodsStore();
  return await periodsStore.GetStorePeriodActive();
};

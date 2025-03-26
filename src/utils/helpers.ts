import { usePersonStore } from '@/stores/PersonStore';
import { useSchoolYearStore } from '@/stores/SchoolYearStore';
import { useStudentStore } from '@/stores/StudentStore';
import { useGroupsStore } from '@/stores/GroupsStore';
import { usePeriodsStore } from '@/stores/PeriodsStore'
import { useSubjectStore } from '@/stores/SubjectStore';
import { useTeachersStore } from '@/stores/TeachersStore';
import { useCoursesStore } from '@/stores/CoursesStore';
import { useUnitsStore } from '@/stores/UnitStore';

const groupStore = useGroupsStore();
const schoolYearStore = useSchoolYearStore();
const personStore = usePersonStore()
const studentStore = useStudentStore();
const subjectStore = useSubjectStore();
const periodsStore = usePeriodsStore();
const teachersStore = useTeachersStore();
const courseStore = useCoursesStore();
const UnitStore = useUnitsStore();

export const GetPersons = async () => {
  return await personStore.GetStorePersons();
};

export const GetPersonsWithOutStudet = async () => {
  return await personStore.GetStorePersonsWithOutStudent();
}

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

export const GetGroups = async () => {
  return await groupStore.GetStoreGroups();
};

export const GetTeachers = async () => {
  return await teachersStore.GetStoreTeachers();
};

export const GetCourses = async () => {
  return await courseStore.GetStoreCourses();
};

export const GetUnits = async () => {
  return await UnitStore.GetStoreUnits();
};
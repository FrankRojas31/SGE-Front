import { usePersonStore } from '@/stores/PersonStore';
import { useSchoolYearStore } from '@/stores/SchoolYearStore';
import { useStudentStore } from '@/stores/StudentStore';
import { useGroupsStore } from '@/stores/GroupsStore';
import { usePeriodsStore } from '@/stores/PeriodsStore'
import { useSubjectStore } from '@/stores/SubjectStore';
import { useCoursesStore } from '@/stores/CoursesStore';

const groupStore = useGroupsStore();
const schoolYearStore = useSchoolYearStore();
const personStore = usePersonStore()
const studentStore = useStudentStore();
const subjectStore = useSubjectStore();
const periodsStore = usePeriodsStore();
const courseStore = useCoursesStore();

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

export const GetCourses = async () => {
  return await courseStore.GetStoreCourses();
};

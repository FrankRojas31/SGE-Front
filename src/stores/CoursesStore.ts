import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetCourses, PostCourse, GetCourse, PutCourse, DeleteCourse } from '@/api/services/CoursesService';
import type { Courses } from '@/types/Courses';

export const useCoursesStore = defineStore('Courses', () => {
  const coursesList = ref<Courses[]>([]);
  const course = ref<Courses>({} as Courses);

  async function GetStoreCourses() {
    const response = await GetCourses();
    if (response?.success === true) {
      coursesList.value = response.data;
    }
    return response;
  }

  async function PostStoreCourse(course: Courses) {
    const response = await PostCourse(course);
    if (response?.success === true) {
      await GetStoreCourses();
    }
    return response;
  }

  async function GetStoreCourse(id: number) {
    const response = await GetCourse(id);
    if (response?.success === true) {
      course.value = response.data;
    }
    return response;
  }

  async function PutStoreCourse(course: Courses) {
    const response = await PutCourse(course);
    if (response?.success === true) {
      await GetStoreCourses();
    }
    return response;
  }

  async function DeleteStoreCourse(id: number) {
    const response = await DeleteCourse(id);
    if (response?.success === true) {
      await GetStoreCourses();
    }
    return response;
  }

  return { GetStoreCourses, PostStoreCourse, GetStoreCourse, PutStoreCourse, DeleteStoreCourse, coursesList, course };
});

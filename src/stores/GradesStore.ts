import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResponseHelper } from '@/types/ResponseHelper'
import type { ICalifications } from '@/types/Califications'
import {
  GetCalifications,
  GetCalification,
  PostCalification,
  PutCalification,
  DeleteCalification,
} from '@/api/services/CalificationService'

export const useGradesStore = defineStore('gradesStore', () => {
  const gradesList = ref<ICalifications[]>([])
  const grade = ref<ICalifications>({} as ICalifications)

  async function GetGradesStore() {
    const response: ResponseHelper<ICalifications[]> | null = await GetCalifications()
    if (response && response.success) {
      gradesList.value = response.data || []
    }
    return response
  }

  async function GetStoreGrade(id: number) {
    const response: ResponseHelper<ICalifications> | null = await GetCalification(id)
    if (response?.success) {
      grade.value = response.data!
    }
    return response
  }

  async function PostStoreGrade(newGrade: ICalifications) {
    const response = await PostCalification(newGrade)
    if (response?.success) {
      await GetGradesStore()
    }
    return response
  }

  async function PutStoreGrade(updatedGrade: ICalifications) {
    const response = await PutCalification(updatedGrade)
    if (response?.success) {
      await GetGradesStore()
    }
    return response
  }

  async function DeleteStoreGrade(id: number) {
    const response = await DeleteCalification(id)
    if (response?.success) {
      await GetGradesStore()
    }
    return response
  }

  return {
    gradesList,
    grade,
    GetGradesStore,
    GetStoreGrade,
    PostStoreGrade,
    PutStoreGrade,
    DeleteStoreGrade,
  }
})

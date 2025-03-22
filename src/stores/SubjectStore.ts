import { DeleteSubject, GetSubject, GetSubjects, PostSubject, PutSubject } from "@/api/services/SubjectsServices";
import type { ISubject } from "@/types/Subject";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSubjectStore = defineStore('useSubjectStore',() => {
  const subjectsList = ref<ISubject[]>([]);
  const subject = ref<ISubject>({} as ISubject);

  async function GetStoreSubjects(){
      const response = await GetSubjects();

      if(response?.success === true){
        subjectsList.value = response.data;
      }

      return response;
    }

    async function PostStoreSubject(subject: ISubject){
      const response = await PostSubject(subject);

      if(response?.success === true){
        await GetStoreSubjects();
      }

      return response;
    }

    async function GetStoreSubject(id: number){
      const response = await GetSubject(id);

      if(response?.success === true){
        subject.value = response.data;
      }
      return response;
    }

    async function PutStoreSubject(subject: ISubject){
      const response = await PutSubject(subject);

      if (response?.success === true){
        await GetStoreSubjects();
      }

      return response;
    }

    async function DeleteStoreSubject(id: number){
      const response = await DeleteSubject(id);

      if (response?.success === true){
        await GetStoreSubjects();
      }
      return response;
    }

  return { GetStoreSubjects, PostStoreSubject, GetStoreSubject, PutStoreSubject, DeleteStoreSubject, subjectsList, subject };
})

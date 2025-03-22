import { DeletePerson, GetPerson, GetPersons, PostPerson, PutPerson } from "@/api/services/PersonsServices";
import type { IPerson } from "@/types/Persons";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePersonStore = defineStore('Persons', () => {
  const personsList = ref<IPerson[]>([]);
  const person = ref<IPerson>({} as IPerson);

  async function GetStorePersons(){
      const response = await GetPersons();

      if(response?.success === true){
        personsList.value = response.data;
      }

      return response;
    }

    async function PostStorePerson(person: IPerson){
      const response = await PostPerson(person);

      if(response?.success === true){
        await GetStorePersons();
      }

      return response;
    }

    async function GetStorePerson(id: number){
      const response = await GetPerson(id);

      if(response?.success === true){
        person.value = response.data;
      }
      return response;
    }

    async function PutStorePerson(Person: IPerson){
      const response = await PutPerson(Person);

      if (response?.success === true){
        await GetStorePersons();
      }

      return response;
    }

    async function DeleteStorePerson(id: number){
      const response = await DeletePerson(id);

      if (response?.success === true){
        await GetStorePersons();
      }
      return response;
    }

    return { GetStorePersons, PostStorePerson, GetStorePerson, PutStorePerson, DeleteStorePerson, personsList, person}
});

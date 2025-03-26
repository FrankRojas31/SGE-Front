import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PostGroup, GetGroup, PutGroup, DeleteGroup, GetGroupsInPeriodActive } from '@/api/services/GroupsService';
import type { Groups } from '@/types/Groups';

export const useGroupsStore = defineStore('Groups', () => {
  const groupsList = ref<Groups[]>([]);
  const group = ref<Groups>({} as Groups);

  async function GetStoreGroups() {
    const response = await GetGroupsInPeriodActive();
    if (response?.success === true) {
      groupsList.value = response.data;
    }
    return response;
  }

  async function PostStoreGroup(group: Groups) {
    const response = await PostGroup(group);
    if (response?.success === true) {
      await GetStoreGroups();
    }
    return response;
  }

  async function GetStoreGroup(id: number) {
    const response = await GetGroup(id);
    if (response?.success === true) {
      group.value = response.data;
    }
    return response;
  }




  async function PutStoreGroup(group: Groups) {
    const response = await PutGroup(group);
    if (response?.success === true) {
      await GetStoreGroups();
    }
    return response;
  }

  async function DeleteStoreGroup(id: number) {
    const response = await DeleteGroup(id);
    if (response?.success === true) {
      await GetStoreGroups();
    }
    return response;
  }

  return { GetStoreGroups, PostStoreGroup, GetStoreGroup, PutStoreGroup, DeleteStoreGroup, groupsList, group };
});

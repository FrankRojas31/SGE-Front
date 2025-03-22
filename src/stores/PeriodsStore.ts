import { DeletePeriod, GetPeriod, GetPeriods, PostPeriod, PutPeriod } from "@/api/services/PeriodsServices";
import type { IPeriods } from "@/types/Periods";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePeriodsStore = defineStore("Periods", () => {
  const periodsList = ref<IPeriods[]>([]);
  const period = ref<IPeriods>({} as IPeriods);

  async function GetStorePeriods() {
    const response = await GetPeriods();

    if (response?.success === true) {
      periodsList.value = response.data;
    }

    return response;
  }

  async function PostStorePeriod(period: IPeriods) {
    const response = await PostPeriod(period);

    if (response?.success === true) {
      await GetStorePeriods();
    }

    return response;
  }

  async function GetStorePeriod(id: number) {
    const response = await GetPeriod(id);

    if (response?.success === true) {
      period.value = response.data;
    }

    return response;
  }

  async function PutStorePeriod(period: IPeriods) {
    const response = await PutPeriod(period);

    if (response?.success === true) {
      await GetStorePeriods();
    }

    return response;
  }

  async function DeleteStorePeriod(id: number) {
    const response = await DeletePeriod(id);

    if (response?.success === true) {
      await GetStorePeriods();
    }

    return response;
  }

  return { GetStorePeriods, PostStorePeriod, GetStorePeriod, PutStorePeriod, DeleteStorePeriod, periodsList, period };

});

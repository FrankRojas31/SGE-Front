// stores/AuthStore.ts
import { LoginAuth } from "@/api/services/auth/AuthServices";
import type { IAuthUser, ILoginUser } from "@/types/Auth/Users";
import { useSessionStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { setInitialTokens } from "@/api/GenericRequest";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('Auth', () => {
  const router = useRouter();
  const auth = useSessionStorage<IAuthUser>('auth', {} as IAuthUser);

  async function LoginStore(userLogin: ILoginUser) {
    const response = await LoginAuth(userLogin);


    if (response?.success && response.data) {
      auth.value = response.data;
      setInitialTokens({
        accessToken: response.data.accessToken || "",
        refreshToken: response.data.refreshToken || "",
        accessTokenExpiration: response.data.accessTokenExpiration || "",
      });
      router.push("/dashboard");
    }

    return response;
  }

  function isAuthenticated(): boolean {
    return !!auth.value.accessToken && new Date(auth.value.accessTokenExpiration || "") > new Date();
  }

  function logout() {
    auth.value = {} as IAuthUser;
    localStorage.removeItem("tokens");
  }

  return { LoginStore, auth, isAuthenticated, logout };
});

import type { TokenModel } from "@/types/Auth/Users";
import type { RequestOptions } from "@/types/RequestOptions";
import type { ResponseHelper } from "@/types/ResponseHelper";
import axios, { AxiosError, type AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_URL_API || "https://localhost:7144/api";
let currentTokens: TokenModel | null = null;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

const updateTokens = (tokens: TokenModel) => {
  currentTokens = tokens;
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

const getTokens = (): TokenModel | null => {
  if (currentTokens) return currentTokens;
  const stored = localStorage.getItem("tokens");
  return stored ? JSON.parse(stored) : null;
};

const refreshToken = async (): Promise<string | null> => {
  const tokens = getTokens();
  if (!tokens?.refreshToken) return null;

  try {
    const response = await axios.post(`${baseURL}/Account/refresh`, {
      refreshToken: tokens.refreshToken,
    });

    const newTokens: TokenModel = response.data;
    updateTokens(newTokens);
    return newTokens.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.removeItem("tokens");
    const { useAuthStore } = await import("@/stores/auth/AuthStore");
    const authStore = useAuthStore();
    authStore.logout();
    return null;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as unknown as RequestOptions & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.authToken = newAccessToken;

        const { useAuthStore } = await import("@/stores/auth/AuthStore");
        const authStore = useAuthStore();
        authStore.auth.accessToken = newAccessToken;
        authStore.auth.refreshToken = getTokens()?.refreshToken || "";
        authStore.auth.accessTokenExpiration = getTokens()?.accessTokenExpiration || "";

        return axiosInstance({
          ...originalRequest,
          headers: {
            ...(originalRequest.headers ? { "Content-Type": originalRequest.headers } : {}),
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      }
    }
    return Promise.reject(error);
  }
);

export async function GenericRequest<T>({
  url,
  method,
  headers,
  params,
  data,
  authToken,
}: RequestOptions): Promise<ResponseHelper<T> | null> {
  try {
    const tokens = getTokens();
    const tokenToUse = authToken || tokens?.accessToken;
    const urlCompleted = `${baseURL}/${url}`;

    const response = await axiosInstance({
      url: urlCompleted,
      method,
      headers: {
        ...(headers ? { "Content-Type": headers } : {}),
        ...(tokenToUse ? { Authorization: `Bearer ${tokenToUse}` } : {}),
      },
      params,
      data,
    });

    return response.data as ResponseHelper<T>;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error in the request:", error);
    } else {
      console.error("Unknown error:", error);
    }
    return null;
  }
}

export const setInitialTokens = (tokens: TokenModel) => {
  updateTokens(tokens);
};

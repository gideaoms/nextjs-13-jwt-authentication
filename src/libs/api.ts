import axios from "axios";

const isServer = typeof window === "undefined";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use(async function (config) {
  if (isServer) {
    const { cookies } = await import("next/headers");
    const token = cookies().get("@my-app/token")?.value;
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }
  }
  return config;
});

export function setToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

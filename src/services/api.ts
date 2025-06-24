import axios from "axios";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() / 1000 > exp;
  } catch {
    return true;
  }
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject("Token expirado");
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

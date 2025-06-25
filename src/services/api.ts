import axios from "axios";

const api = axios.create({
  // baseURL: `${import.meta.env.VITE_API_URL}/`,
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

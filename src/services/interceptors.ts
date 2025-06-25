import { type AxiosInstance } from "axios";
import { type Store } from "@reduxjs/toolkit";
import { logout } from "../store/authSlice";
import { type NavigateFunction } from "react-router-dom";
import { isTokenExpired } from "./tokenUtils";

export const setupInterceptors = (
  api: AxiosInstance,
  store: Store,
  navigate: NavigateFunction
) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        if (isTokenExpired(token)) {
          localStorage.removeItem("token");
          store.dispatch(logout());
          navigate("/login");
          return Promise.reject("Token expirado");
        }

        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

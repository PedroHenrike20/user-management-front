import { z } from "zod";
import api from "./api";
import type { ResponsePayloadLogin } from "../types/Auth";
import type { UserDto } from "../types/User";
import axios from "axios";

const PREFIX_ROUTE_API = "auth/";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: ResponsePayloadLogin; user: UserDto }> => {
  try {
    const parsedData: FormData = formSchema.parse({ email, password });
    const response = await api.post<ResponsePayloadLogin>(
      `${PREFIX_ROUTE_API}login`,
      parsedData
    );

    localStorage.setItem("token", response.data.access_token);

    const user = await loadDataUser();
    return { token: response.data, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors[0];
      return Promise.reject(new Error(`Erro de login: ${messages.message}`));
    } else {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;

        if (typeof apiMessage === "string") {
          return Promise.reject(new Error(apiMessage));
        }
      }
      return Promise.reject(new Error("Erro desconhecido"));
    }
  }
};

const loadDataUser = async () => {
  try {
    const response = await api.get<UserDto>(`user/${PREFIX_ROUTE_API}profile`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.message;

      if (typeof apiMessage === "string") {
        return Promise.reject(new Error(apiMessage));
      }
    }
    return Promise.reject(new Error("Erro desconhecido"));
  }
};

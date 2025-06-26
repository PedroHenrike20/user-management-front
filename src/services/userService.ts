import type { CreateUserDto, UserDto } from "../types/User";
import { z } from "zod";
import api from "./api";
import axios from "axios";

const PREFIX_ROUTE_API = "user/auth/";

const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(1, "Nome é obrigatório"),
});

const updateUserSchema = formSchema.extend({
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    }),
});

type FormData = z.infer<typeof formSchema>;
type UpdateFormData = z.infer<typeof updateUserSchema>;

export const registerUser = async (
  user: CreateUserDto
): Promise<UserDto | undefined> => {
  try {
    const parsedData: FormData = formSchema.parse(user);

    const response = await api.post<UserDto>(
      `${PREFIX_ROUTE_API}register`,
      parsedData
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errors = error.errors;

      const hasPasswordMinError = errors.some(
        (e) =>
          e.code.toLowerCase().includes("too_small") &&
          e.path.includes("password")
      );

      const hasRequiredFieldError = errors.some(
        (e) =>
          e.code === "invalid_type" ||
          e.message.toLowerCase().includes("obrigatório")
      );

      if (hasRequiredFieldError) {
        return Promise.reject(new Error("Preencha os campos vazios"));
      }

      if (hasPasswordMinError) {
        return Promise.reject(
          new Error("Senha deve ter pelo menos 6 caracteres")
        );
      }

      const messages = errors.map((e) => e.message);
      return Promise.reject(
        new Error(`Erro de validação: ${messages.join(", ")}`)
      );
    }

    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.message;

      if (typeof apiMessage === "string") {
        return Promise.reject(new Error(apiMessage));
      }
    }

    return Promise.reject(new Error("Erro desconhecido"));
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await api.delete(`${PREFIX_ROUTE_API}user/${id}`);
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

export const updateUser = async (
  id: string,
  user: CreateUserDto
): Promise<UserDto | undefined> => {
  try {
    const parsedData: UpdateFormData = updateUserSchema.parse(user);
    const response = await api.patch<UserDto>(
      `${PREFIX_ROUTE_API}user/${id}`,
      parsedData
    );
    return response.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const mensagens = error.errors.map((e) => `${e.message}`);
      return Promise.reject(
        new Error(`Erro de validação: ${mensagens.join(", ")}`)
      );
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

export const getAllUsers = async (): Promise<UserDto[]> => {
  try {
    const response = await api.get<UserDto[]>(`${PREFIX_ROUTE_API}users`);
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

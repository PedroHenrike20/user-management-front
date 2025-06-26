import { useForm } from "react-hook-form";
import { updateUser } from "../../services/userService";
import type { UserDto } from "../../types/User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setUser } from "../../store/authSlice";
import { toast } from "react-toastify";
import LoadingButton from "../../components/LoadingButton";

type UpdateFormDto = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

type UpdateFormProps = {
  user: UserDto;
  close: () => void;
};

const UpdateForm = ({ user, close }: UpdateFormProps) => {
  const { register, handleSubmit, setValue } = useForm<UpdateFormDto>();
  const [loading, setLoading] = useState(false);
  const userLogado = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("name", user.name!);
      setValue("email", user.email);
      setValue("password", "");
    }
  }, [user, setValue]);

  const onSubmit = async (data: UpdateFormDto) => {
    setLoading(true);
    try {
      const response = await updateUser(data.id!, data);
      if (user.id === userLogado?.id) {
        dispatch(setUser(response!));
      }
      toast.success("Usuário atualizado com sucesso!");
      close();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar usuário"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("id")} />
      <input
        {...register("name")}
        placeholder="Nome"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        {...register("email")}
        disabled
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Senha"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <LoadingButton
        loading={loading}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Atualizar
      </LoadingButton>
    </form>
  );
};

export default UpdateForm;

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";
import LoadingButton from "../../components/LoadingButton";
import { useState } from "react";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm<RegisterFormInputs>();
  const { isValid } = formState;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      await registerUser(data);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Erro desconhecido. Não foi possível realizar o cadastro!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name", { required: true })}
        placeholder="Nome"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        {...register("email", { required: true })}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Senha"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <LoadingButton
        loading={loading}
        disabled={!isValid}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Criar conta
      </LoadingButton>
    </form>
  );
};

export default RegisterForm;

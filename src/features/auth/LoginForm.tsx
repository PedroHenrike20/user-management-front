import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../store/authSlice";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingButton from "../../components/LoadingButton";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" });
  const { isValid } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      const { token, user } = await loginUser(data.email, data.password);
      dispatch(login(token.access_token));
      dispatch(setUser(user));
      navigate("/home");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao fazer o login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("email", { required: true })}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        {...register("password", { required: true })}
        placeholder="Senha"
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <LoadingButton
        disabled={!isValid}
        loading={loading}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Entrar
      </LoadingButton>
    </form>
  );
};

export default LoginForm;

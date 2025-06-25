import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../store/authSlice";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      const { token, user } = await loginUser(data.email, data.password);
      dispatch(login(token.access_token));
      dispatch(setUser(user));
      navigate("/home");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao fazer o login"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("email")}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        {...register("password")}
        placeholder="Senha"
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;

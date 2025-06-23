import { Link } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 shadow-md w-full max-w-sm rounded min-h-[21rem] pt-10 flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
          Bem vindo, novamente!
        </h2>
        <LoginForm />
      </div>
      <p className="text-sm text-center text-gray-600 mt-6 px-4">
        Não tem uma conta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Crie uma agora!
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

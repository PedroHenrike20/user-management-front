import { Link } from "react-router-dom";
import RegisterForm from "../features/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 shadow-md w-full max-w-sm rounded">
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
          Criar Conta
        </h2>
        <RegisterForm />
      </div>
      <p className="text-sm text-center text-gray-600 mt-6 px-4">
        Já tem uma conta?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Faça o login!
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

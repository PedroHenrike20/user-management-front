import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const isActive = (path: string) => location.pathname === path;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="absolute top-0 left-0 w-full flex flex-wrap items-center px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-300 shadow-md justify-between z-50">
      <span className="text-xl sm:text-2xl font-bold flex items-center space-x-2">
        <svg
          className="w-5 h-5 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
        </svg>
        <span>People's Consultoria</span>
      </span>

      {isAuthenticated && (
        <nav className="flex flex-wrap gap-4 items-center text-sm mt-4 sm:mt-0">
          <Link
            to="/home"
            className={`hover:underline ${
              isActive("/home")
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            Home
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className={`hover:underline ${
                isActive("/dashboard")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Registros
            </Link>
          )}
          <Link
            to="/profile"
            className={`hover:underline ${
              isActive("/profile")
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            Meu Perfil
          </Link>

          <button
            onClick={handleLogout}
            className="hover:underline text-red-500 sm:ml-10"
          >
            Sair
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;

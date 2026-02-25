import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Tool IA Logo"
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-6">

            {user ? (
              <>
                <span className="hidden md:block text-sm text-gray-500">
                  Bonjour,{" "}
                  <span className="font-semibold text-gray-900">
                    {user.email}
                  </span>
                </span>

                <Link
                  to="/dashboard"
                  className="relative text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-300"
                >
                  Tableau de bord
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <button
                  onClick={logout}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition duration-300"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition duration-300"
                >
                  Se connecter
                </Link>

                <Link
                  to="/register"
                  className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                >
                  S'inscrire gratuitement
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
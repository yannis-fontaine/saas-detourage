import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Vérifie que ce chemin est bon !

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto w-full bg-transparent">
      {/* LE LOGO (cliquable vers l'accueil) */}
      <Link to="/" className="text-2xl font-black tracking-tight text-blue-600 no-underline hover:text-blue-700 transition">
        DetourImage
      </Link>

      {/* LES BOUTONS DE DROITE */}
      <nav className="flex items-center gap-4">
        {user ? (
          // SI L'UTILISATEUR EST CONNECTÉ
          <>
            <span className="text-gray-600 hidden sm:block">
              Bonjour, <b className="text-gray-900">{user.email}</b>
            </span>
            <button 
              onClick={logout} 
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition"
            >
              Se déconnecter
            </button>
          </>
        ) : (
          // SI L'UTILISATEUR N'EST PAS CONNECTÉ
          <>
            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition">
              Se connecter
            </Link>
            <Link to="/register" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-lg shadow-blue-200">
              S'inscrire
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
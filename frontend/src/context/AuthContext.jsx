import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// On crée le contexte (la mémoire globale)
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // L'utilisateur connecté (ou null)
  const [loading, setLoading] = useState(true); // Est-ce qu'on charge les infos ?

  // Configuration par défaut d'Axios pour inclure les cookies (IMPORTANT !)
  axios.defaults.withCredentials = true;

  // 1. Vérifier si l'utilisateur est déjà connecté au chargement de la page
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      // On demande au backend "Qui suis-je ?"
      const { data } = await axios.get('http://localhost:5000/api/auth/me');
      setUser(data); // Si ça marche, on stocke l'utilisateur
    } catch (error) {
      setUser(null); // Sinon, on n'est pas connecté
    } finally {
      setLoading(false); // On a fini de chercher
    }
  };

  // 2. Fonction de Connexion (Login)
  const login = async (email, password) => {
    // On envoie email + mdp au backend
    const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    setUser(data); // On met à jour l'état global
    // Pas besoin de gérer le cookie, le navigateur le fait tout seul !
  };

  // 3. Fonction d'Inscription (Register)
  const register = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/register', { email, password });
    setUser(data);
  };

// 4. Fonction de Déconnexion (Logout)
  const logout = async () => {
    try {
      // On demande au backend de supprimer le cookie
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch (error) {
      console.error("Erreur lors de la déconnexion serveur", error);
    } finally {
      // QUOI QU'IL ARRIVE (Succès ou Erreur), on vide l'utilisateur localement
      setUser(null); 
      // Optionnel : On peut recharger la page pour être sûr que tout est propre
      // window.location.href = "/"; 
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
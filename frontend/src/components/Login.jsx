import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'; // On importe le cerveau

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Pour basculer entre Login et Register
  const [error, setError] = useState('');
  
  // On récupère les fonctions magiques du contexte
  const { login, register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegister) {
        await register(email, password); // Inscription
      } else {
        await login(email, password);    // Connexion
      }
      // Si ça marche, le contexte se met à jour et App.jsx changera l'affichage tout seul !
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{isRegister ? 'Créer un compte' : 'Se connecter'}</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email :</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Mot de passe :</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isRegister ? "S'inscrire" : "Se connecter"}
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"}
        {' '}
        <span 
          onClick={() => setIsRegister(!isRegister)} 
          style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isRegister ? "Se connecter" : "Créer un compte"}
        </span>
      </p>
    </div>
  );
};

export default Login;
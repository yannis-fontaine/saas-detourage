import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) await register(email, password);
      else await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  return (
    <div className="card">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {isRegister ? 'Bienvenue 👋' : 'Ravi de vous revoir'}
        </h2>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
          {isRegister ? "Créez votre compte gratuit" : "Connectez-vous à votre espace"}
        </p>
      </div>
      
      {error && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Adresse Email</label>
          <input 
            type="email" 
            placeholder="exemple@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label>Mot de passe</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit">
          {isRegister ? "S'inscrire gratuitement" : "Se connecter"}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
        {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"}
        {' '}
        <span 
          onClick={() => setIsRegister(!isRegister)} 
          style={{ color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }}
        >
          {isRegister ? "Se connecter" : "Créer un compte"}
        </span>
      </div>
    </div>
  );
};

export default Login;
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Login from './components/Login';
import ImageUpload from './components/ImageUploader'; // <--- 1. IMPORT DU COMPOSANT

function App() {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Chargement de l'application...</div>;
  }

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
      {!user ? (
        // Si PAS connecté : On affiche le Login
        <Login />
      ) : (
        // Si CONNECTÉ : On affiche l'interface principale
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          
          {/* Header */}
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
            <h1 style={{ margin: 0, color: '#333' }}>Mon Détourage IA 🚀</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#666' }}>Bonjour, <b>{user.email}</b></span>
              <button onClick={logout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Se déconnecter
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main>
            <p style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>
              Bienvenue dans votre espace privé. Chargez une image ci-dessous pour supprimer l'arrière-plan.
            </p>
            
            {/* <--- 2. LE RETOUR DE L'OUTIL DE DÉTOURAGE */}
            <ImageUpload /> 
            
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
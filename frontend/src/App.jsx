import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Login from './components/Login';
// Importe ton composant d'upload (adapte le chemin selon où tu l'as mis à l'étape 5)
// Si tu n'as pas encore créé de composant séparé, tu peux laisser ton code d'upload ici.
// Pour l'exemple, je suppose que tu as tout mis dans App.jsx avant.

function App() {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Chargement...</div>; // Petit écran de chargement au démarrage
  }

  return (
    <div className="App">
      {/* LE COEUR DU SYSTÈME :
         Si 'user' existe, on affiche l'appli. Sinon, on affiche le Login.
      */}
      
      {!user ? (
        <Login />
      ) : (
        <div style={{ padding: '20px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h1>Mon Détourage IA 🚀</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span>Bonjour, <b>{user.email}</b></span>
              <button onClick={logout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Se déconnecter
              </button>
            </div>
          </header>

          {/* ICI : TON CODE D'UPLOAD D'IMAGE DE L'ÉTAPE 5 */}
          <main>
            <p>Bienvenue dans votre espace privé. Ici se trouvera votre outil de détourage.</p>
            {/* Tu pourras remettre ton composant <ImageUpload /> ici plus tard */}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
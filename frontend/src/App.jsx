import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './components/Login'; // Vérifie tes chemins d'import
import Register from './components/Register'; // Vérifie tes chemins d'import
import ImageUpload from './components/ImageUploader';
import Navbar from './components/Navbar'; // <-- IMPORT DE LA NAVBAR

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Chargement de l'application...</div>;
  }

  // Composant pour protéger la route (Seulement les connectés)
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        
        {/* LA NAVBAR GLOBALE EST ICI : Elle s'affichera sur toutes les pages ! */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <Navbar />
        </div>

        {/* Le contenu des pages changera ici en fonction de l'URL */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={user ? <Navigate to="/app" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/app" replace /> : <Register />} />

            <Route 
              path="/app" 
              element={
                <ProtectedRoute>
                  <main className="max-w-4xl mx-auto p-4 mt-8">
                    <p className="text-center text-gray-600 mb-8 text-lg">
                      Chargez une image ci-dessous pour supprimer l'arrière-plan.
                    </p>
                    <ImageUpload /> 
                  </main>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
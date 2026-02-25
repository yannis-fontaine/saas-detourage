import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './components/Login'; 
import Register from './components/Register'; 
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard'; 
import ImageUpload from './components/ImageUploader'; 

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Chargement de Tool.IA...</div>;
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <Navbar />
        </div>

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            {/* Redirection vers le dashboard si connecté */}
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

            {/* LE NOUVEAU HUB CENTRAL */}
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />

            {/* OUTIL 1 : Le Détourage (Ton ancien /app) */}
            <Route 
              path="/tools/remove-bg" 
              element={
                <ProtectedRoute>
                  <div className="max-w-4xl mx-auto p-4 mt-8">
                    <Link to="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">← Retour au tableau de bord</Link>
                    <ImageUpload /> 
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* OUTIL 2 : Text to Speech (Placeholder pour plus tard) */}
            <Route 
              path="/tools/text-to-speech" 
              element={
                <ProtectedRoute>
                  <div className="max-w-4xl mx-auto p-4 mt-8 text-center">
                    <Link to="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">← Retour</Link>
                    <h2 className="text-3xl font-bold">🎙️ Clone Vocal IA</h2>
                    <p className="mt-4 text-gray-500">Module en cours de construction...</p>
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* OUTIL 3 : Génération d'images (Placeholder pour plus tard) */}
            <Route 
              path="/tools/image-generation" 
              element={
                <ProtectedRoute>
                  <div className="max-w-4xl mx-auto p-4 mt-8 text-center">
                    <Link to="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">← Retour</Link>
                    <h2 className="text-3xl font-bold">🎨 Générateur d'images (Stable Diffusion)</h2>
                    <p className="mt-4 text-gray-500">Module en cours de construction...</p>
                  </div>
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
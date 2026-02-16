import { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); // Pour voir l'image avant envoi
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file)); // Afficher la miniature
        setResultImage(null);
        setError('');
    }
  };

  const handleUpload = async () => {
      if (!selectedFile) {
          alert("Veuillez sélectionner une image d'abord !");
          return;
      }

      setLoading(true);
      setError('');
      setResultImage(null); // On nettoie l'ancienne image

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        console.log("🚀 Envoi de l'image vers l'IA...");
        
        // 1. On envoie la requête
        const response = await axios.post('/ai/remove-bg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // <--- C'EST LA CLEF MAGIQUE 🔑
        });

        console.log("📦 Réponse reçue !", response);

        // 2. On vérifie qu'on a bien reçu des données (pas un fichier vide)
        if (response.data.size < 100) {
            throw new Error("L'image reçue est trop petite (erreur probable)");
        }

        // 3. On crée une URL magique locale pour l'afficher
        // C'est ça qui évite l'erreur 405 "Method Not Allowed"
        const imageLocalUrl = URL.createObjectURL(response.data);
        
        console.log("✨ URL Locale créée :", imageLocalUrl);
        
        // 4. On met à jour l'affichage
        setResultImage(imageLocalUrl);

      } catch (err) {
        console.error("❌ Erreur détaillée :", err);
        setError("Erreur lors du traitement. Regarde la console (F12) !");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Zone d'Upload */}
      <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div className="upload-zone" onClick={() => document.getElementById('fileInput').click()}>
            {preview ? (
                <img src={preview} alt="Aperçu" style={{ maxHeight: '200px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            ) : (
                <>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
                    <p style={{ fontWeight: '500', color: '#4b5563' }}>Cliquez pour ajouter une image</p>
                    <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>JPG ou PNG</p>
                </>
            )}
            <input 
                id="fileInput" 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
            />
        </div>

        {error && <p style={{ color: '#ef4444', marginTop: '1rem' }}>{error}</p>}

        <button 
          onClick={handleUpload} 
          disabled={!selectedFile || loading}
          style={{ marginTop: '1.5rem' }}
        >
          {loading ? 'Traitement en cours... ✨' : 'Lancer le détourage Magic 🪄'}
        </button>
      </div>

      {/* Résultat */}
      {resultImage && (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'center', animation: 'fadeIn 0.5s' }}>
          <h3 style={{ marginBottom: '1rem' }}>Résultat</h3>
          
          <div className="checkerboard" style={{ padding: '20px', borderRadius: '12px', display: 'inline-block' }}>
            <img 
                src={resultImage} 
                alt="Résultat" 
                style={{ maxWidth: '100%', maxHeight: '400px', display: 'block' }} 
            />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <a href={resultImage} download="detourage-hd.png" style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#10b981' }}>⬇️ Télécharger la nouvelle image</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
import { useState } from 'react';
import axios from 'axios';
import './ImageUploader.css'; // On va créer ce fichier juste après

const ImageUploader = () => {
  // --- LA MÉMOIRE DU COMPOSANT ---
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false); // Pour savoir si ça charge

  // --- QUAND L'UTILISATEUR CHOISIT UNE IMAGE ---
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // On prend le 1er fichier
    if (file) {
      setSelectedFile(file);
      // On crée une fausse URL pour afficher l'image tout de suite
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedImage(null); // On efface le résultat précédent
    }
  };

  // --- QUAND ON CLIQUE SUR "RETIRER LE FOND" ---
  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true); // On active le mode chargement

    // On prépare l'enveloppe virtuelle (FormData)
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // LE FACTEUR (AXIOS) PART AU TRAVAIL
      // Il va frapper à la porte 8000 (ton Python)
      const response = await axios.post('http://127.0.0.1:8000/remove-background', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // IMPORTANT : On dit qu'on attend une IMAGE (un blob), pas du texte
      });

      // Le facteur est revenu avec l'image !
      // On la transforme en URL affichable
      const url = URL.createObjectURL(response.data);
      setProcessedImage(url);
      
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur ! Vérifie que ton terminal Python est bien lancé.");
    } finally {
      setLoading(false); // On arrête le chargement
    }
  };

  // --- CE QUE L'UTILISATEUR VOIT (HTML) ---
  return (
    <div className="uploader-container">
      <h2>Détourage d'image</h2>
      
      {/* BOUTON D'UPLOAD */}
      <div className="input-group">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile || loading}>
          {loading ? 'Traitement en cours...' : 'Retirer le fond'}
        </button>
      </div>

      {/* ZONE D'AFFICHAGE */}
      <div className="preview-area">
        {/* Image Originale */}
        {previewUrl && (
          <div className="image-box">
            <h3>Originale</h3>
            <img src={previewUrl} alt="Originale" width="300" />
          </div>
        )}

        {/* Image Résultat */}
        {processedImage && (
          <div className="image-box">
            <h3>Résultat</h3>
            <img src={processedImage} alt="Sans fond" className="result-img" width="300" />
            <br/>
            <a href={processedImage} download="sans-fond.png" className="download-btn">
              Télécharger
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
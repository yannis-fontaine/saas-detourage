import { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResultImage(null);
      setError('');
      setSuccessMessage('');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResultImage(null);
    setError('');
    setSuccessMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');
    setResultImage(null);
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/ai/remove-bg', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      if (response.data.size < 100) {
        throw new Error("L'image reçue est trop petite.");
      }

      const imageLocalUrl = URL.createObjectURL(response.data);
      setResultImage(imageLocalUrl);
      setSuccessMessage('✨ Détourage terminé avec succès !');

    } catch (err) {
      console.error(err);
      setError("Erreur lors du traitement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      
      {/* 🟢 NOTIFICATION DE SUCCÈS */}
      {successMessage && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-center font-bold shadow-sm animate-pulse">
          {successMessage}
        </div>
      )}

      {/* ZONE D'UPLOAD */}
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50">
        <div 
          onClick={() => document.getElementById('fileInput').click()}
          className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer min-h-[300px]"
        >
          {preview ? (
            <img src={preview} alt="Aperçu" className="max-h-64 rounded-xl shadow-md object-contain" />
          ) : (
            <>
              <div className="text-6xl mb-4">📸</div>
              <p className="text-lg font-semibold text-gray-700">Cliquez pour ajouter une image</p>
              <p className="text-sm text-gray-400 mt-2">Formats acceptés : JPG, PNG, WEBP</p>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* AFFICHAGE DES ERREURS */}
        {error && <p className="text-red-500 font-medium text-center mt-4">{error}</p>}

        {/* BOUTON D'ACTION */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className={`w-full mt-6 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex justify-center items-center gap-2
            ${(!selectedFile || loading) 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:-translate-y-1'}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </>
          ) : (
            'Lancer le détourage Magic 🪄'
          )}
        </button>
      </div>

      {/* ZONE DE RÉSULTAT */}
      {resultImage && (
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 mt-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Votre Résultat</h3>
          
          {/* Le Damier Photoshop */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-inner" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6), repeating-linear-gradient(45deg, #f3f4f6 25%, #ffffff 25%, #ffffff 75%, #f3f4f6 75%, #f3f4f6)',
            backgroundPosition: '0 0, 10px 10px',
            backgroundSize: '20px 20px'
          }}>
            <img src={resultImage} alt="Résultat détouré" className="mx-auto max-h-[400px] object-contain block" />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href={resultImage} download="detourage-hd.png" className="w-full sm:w-auto">
              <button className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition shadow-lg shadow-green-200">
                ⬇️ Télécharger l'image HD
              </button>
            </a>
            
            <button onClick={handleReset} className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition">
              🔄 Nouvelle image
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ImageUploader;
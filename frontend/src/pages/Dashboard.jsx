import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center px-6">
      
      <div className="w-full max-w-6xl text-center">
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Votre boîte à outils IA ⚡
        </h2>

        <p className="text-gray-500 mb-12">
          Choisissez l'outil que vous souhaitez utiliser aujourd'hui.
        </p>

        <div className="grid md:grid-cols-3 gap-6 justify-center">
          
          <Link 
            to="/tools/remove-bg" 
            className="block bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 text-left"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto">
              ✂️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Détourage Magique
            </h3>
            <p className="text-gray-500 text-sm text-center">
              Supprimez l'arrière-plan de n'importe quelle image avec une précision chirurgicale.
            </p>
          </Link>

          <Link 
            to="/tools/text-to-speech" 
            className="block bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 text-left"
          >
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto">
              🎙️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Voix IA (TTS) (En construction)
            </h3>
            <p className="text-gray-500 text-sm text-center">
              Transformez votre texte en une voix ultra-réaliste.
            </p>
          </Link>

          <Link 
            to="/tools/image-generation" 
            className="block bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 text-left"
          >
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto">
              🎨
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Créateur d'Images (En construction)
            </h3>
            <p className="text-gray-500 text-sm text-center">
              Générez des images uniques à partir d'une simple description.
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
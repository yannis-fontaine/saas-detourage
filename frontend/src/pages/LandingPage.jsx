import { Link } from 'react-router-dom';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-200">

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold border border-blue-100">
          ✨ Nouveau : IA Ultra-Rapide intégrée
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Supprimez le fond de vos images en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">un seul clic</span>.
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          L'outil indispensable pour les e-commerçants et les créateurs. 
          Un détourage net, précis et professionnel, propulsé par l'Intelligence Artificielle.
        </p>
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Link to="/login" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition shadow-xl shadow-blue-200 text-lg">
            Essayer gratuitement 🚀
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-400">Aucune carte bancaire requise.</p>
      </section>

      {/* SECTION AVANT / APRÈS (Le fameux slider !) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Une précision impressionnante.</h2>
          <p className="text-gray-500 mb-12 text-lg">Glissez le curseur pour voir la magie opérer.</p>
          
          <div className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200" style={{ maxWidth: '700px' }}>
            
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src="/avant.jpg" alt="Image originale" />}
              itemTwo={
                /* Ce div crée le damier blanc/gris typique de la transparence */
                <div className="w-full h-full" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6), repeating-linear-gradient(45deg, #f3f4f6 25%, #ffffff 25%, #ffffff 75%, #f3f4f6 75%, #f3f4f6)',
                  backgroundPosition: '0 0, 10px 10px',
                  backgroundSize: '20px 20px'
                }}>
                  {/* L'image transparente vient se poser par-dessus le damier */}
                  <img src="/apres.png" alt="Image détourée" className="w-full h-full object-cover" />
                </div>
              }
              className="rounded-2xl"
              style={{ minHeight: '400px' }}
            />

          </div>
        </div>
      </section>

      {/* SECTION BÉNÉFICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Pourquoi choisir DetourImage ?</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Carte 1 */}
            <div className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-gray-100 transition duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">⚡</div>
              <h3 className="text-xl font-bold mb-3">Ultra Rapide</h3>
              <p className="text-gray-500">Notre modèle U2Net traite vos images en moins d'une minute, directement depuis notre serveur dédié.</p>
            </div>

            {/* Carte 2 */}
            <div className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-gray-100 transition duration-300">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🎯</div>
              <h3 className="text-xl font-bold mb-3">Précision Chirurgicale</h3>
              <p className="text-gray-500">Cheveux, fourrure, contours complexes... L'IA détecte parfaitement le sujet principal.</p>
            </div>

            {/* Carte 3 */}
            <div className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-gray-100 transition duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🔒</div>
              <h3 className="text-xl font-bold mb-3">100% Privé</h3>
              <p className="text-gray-500">Vos images ne sont ni vendues, ni utilisées pour entraîner d'autres modèles. Confidentialité totale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-400 border-t border-gray-200 mt-12">
        <p>© 2024 DetourImage.</p>
      </footer>

    </div>
  );
};

export default LandingPage;
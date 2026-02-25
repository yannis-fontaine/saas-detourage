import { Link } from 'react-router-dom';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import logo from "../assets/logo.svg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-200">
      
      {/* HERO SECTION */}
      <section className="pt-24 pb-16 px-4 text-center max-w-5xl mx-auto flex flex-col items-center">
          {/* LOGO */}
          <img 
            src={logo} 
            alt="Tool IA Logo"
            className="h-32 w-auto mb-16 drop-shadow-lg"
          />
        <div className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold border border-blue-100">
          ✨ Le hub ultime pour vos créations IA
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-center">
          La boîte à outils IA <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">de bout en bout.</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl text-center leading-relaxed">
          De la vision par ordinateur à la synthèse vocale, en passant par la génération d'images. Découvrez des outils de niveau production conçus pour les créateurs, e-commerçants et designers.
        </p>
        <Link to="/register" className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition shadow-xl text-lg mb-12">
          Accéder aux différents outils IA 🤖
        </Link>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl text-center leading-relaxed">
          Découvrez nos outils ci-dessous ou connectez-vous pour les essayer dès maintenant !
        </p>
        <h1 className="text-4xl font-bold mb-6 text-center">
        ⬇️
        </h1>
      </section>

      {/* OUTIL 1 : DÉTOURAGE + SLIDER AVANT/APRÈS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">✂️</div>
            <h2 className="text-4xl font-bold mb-4">Détourage Magique</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Basé sur le modèle U²-Net, cet outil supprime automatiquement le fond de vos images. Incontournable pour l'e-commerce et le montage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Colonne texte de gauche */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4">Bénéfices & Cas d'usage</h3>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>• Retouche photo et e-commerce ultra-rapide.</li>
                <li>• Interface intuitive prête pour la production.</li>
                <li>• Architecture flexible capable d'intégrer d'autres modèles de segmentation.</li>
              </ul>
              <p className="text-gray-500 italic">
                "Une précision impressionnante. Glissez le curseur ci-contre pour voir la magie opérer."
              </p>
            </div>
            
            {/* Colonne Slider de droite */}
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200" style={{ minHeight: '400px' }}>
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src="/avant.webp" alt="Image originale" />}
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
                className="rounded-2xl h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUTIL 2 : TEXT TO SPEECH */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎙️</div>
            <h2 className="text-4xl font-bold mb-4">Text-to-Speech & Clonage Vocal</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Une alternative minimaliste à ElevenLabs. Transformez du texte en audio de haute qualité et clonez des voix à partir de courts extraits pour vos podcasts ou vidéos.
            </p>
          </div>

          {/* Bloc centré sans tableau */}
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <h3 className="text-xl font-bold mb-6">La valeur du produit</h3>
            <ul className="space-y-4 text-gray-600 text-left inline-block mx-auto">
              <li className="flex items-center gap-3">
                <span className="text-purple-500 text-xl">🔊</span> Accessibilité numérique (lecture assistée).
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-500 text-xl">🗣️</span> Création d'identité vocale de marque personnalisée.
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-500 text-xl">💰</span> Produit prêt à être monétisé via des packs de minutes.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* OUTIL 3 : GÉNÉRATION D'IMAGES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎨</div>
            <h2 className="text-4xl font-bold mb-4">Studio d'Images IA</h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Oubliez la génération aléatoire. Prenez le contrôle total de vos images grâce à Stable Diffusion, ControlNet et LoRA. Décliné en 3 cas d'usage puissants.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-2 text-green-700">ProperShot</h4>
              <p className="text-sm text-gray-600">Retouche immobilière, suppression d'objets, home staging virtuel et variantes jour/nuit.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-2 text-green-700">PhotoAI</h4>
              <p className="text-sm text-gray-600">Génération de portraits cohérents dans divers décors (apprentissage via DreamBooth/LoRA).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-2 text-green-700">InteriorAI</h4>
              <p className="text-sm text-gray-600">Ameublement virtuel et stylisation avec respect strict de la géométrie (ControlNet).</p>
            </div>
          </div>
          
          {/* Tableau technique supprimé ici */}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-gray-900 text-center text-gray-400">
        <p>© 2024 Tool.IA. La suite d'outils IA pour les créateurs.</p>
      </footer>

    </div>
  );
};

export default LandingPage;
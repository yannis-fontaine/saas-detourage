import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid md:grid-cols-4 gap-12">
          
          {/* Colonne 1 : Branding */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Tool IA Logo" className="h-8 w-auto" />
            </div>
            <p className="text-sm leading-relaxed">
              La suite d'outils IA pour les créateurs, e-commerçants et designers.
              Construite pour la performance et la production.
            </p>
          </div>

          {/* Colonne 2 : Produit */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools/remove-bg" className="hover:text-white transition">Détourage IA</Link></li>
              <li><Link to="/tools/text-to-speech" className="hover:text-white transition">Text to Speech</Link></li>
              <li><Link to="/tools/image-generation" className="hover:text-white transition">Studio d'Images</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Ressources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
            </ul>
          </div>

          {/* Colonne 4 : Légal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition">CGU</a></li>
            </ul>
          </div>

        </div>

        {/* Ligne du bas */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-center">
          © {new Date().getFullYear()} Tool.IA — Tous droits réservés.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
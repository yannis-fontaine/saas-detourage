const User = require('../models/User');
const jwt = require('jsonwebtoken');

// --- UTILITAIRE : Générer le Token ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// --- INSCRIPTION (Register) ---
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const user = await User.create({ email, password });

    if (user) {
      res.cookie('jwt', generateToken(user._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        _id: user._id,
        email: user.email,
        message: 'Utilisateur créé avec succès !'
      });
    } else {
      res.status(400).json({ message: 'Données invalides' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
  }
};

// --- CONNEXION (Login) ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Chercher l'utilisateur par son email
    const user = await User.findOne({ email });

    // 2. Vérifier si l'utilisateur existe ET si le mot de passe correspond
    // (La méthode matchPassword est définie dans le modèle User.js)
    if (user && (await user.matchPassword(password))) {
      
      // 3. Générer le cookie sécurisé (La carte d'identité)
      res.cookie('jwt', generateToken(user._id), {
        httpOnly: true,
        secure: false, // <--- ON FORCE À FALSE POUR QUE ÇA MARCHE EN HTTP
        sameSite: 'lax', // 'lax' est plus tolérant que 'strict' pour le développement
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      // 4. Renvoyer les infos (sans le mot de passe bien sûr !)
      res.json({
        _id: user._id,
        email: user.email,
        message: 'Connexion réussie !'
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
  }
};

// --- DÉCONNEXION (Logout) ---
exports.logout = (req, res) => {
  // On écrase le cookie 'jwt' par un cookie vide qui expire immédiatement
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), // Date dans le passé = suppression immédiate
    secure: false,        // <--- IMPORTANT : Doit être pareil que dans le Login !
    sameSite: 'lax'       // <--- IMPORTANT : Doit être pareil que dans le Login !
  });
  
  res.status(200).json({ message: 'Déconnexion réussie' });
};


// ... (tes fonctions register, login, logout sont au-dessus)

// --- PROFIL UTILISATEUR (Protégé) ---
exports.getMe = async (req, res) => {
  // Grâce au middleware, req.user contient déjà les infos de l'utilisateur !
  const user = {
    _id: req.user._id,
    email: req.user.email,
    createdAt: req.user.createdAt
  };
  res.status(200).json(user);
};
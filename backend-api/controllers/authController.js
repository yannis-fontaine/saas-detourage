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
    // 1. VÉRIFICATION EXPLICITE DU MOT DE PASSE (Exemple : 8 caractères)
    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const user = await User.create({ email, password });

    if (user) {
      res.cookie('jwt', generateToken(user._id), {
        httpOnly: true,
        secure: true, // <-- MAINTENANT QU'ON A HTTPS, ON PASSE À TRUE
        sameSite: 'lax',
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
    console.error("Erreur lors de l'inscription :", error);
    
    // 2. GESTION DES ERREURS MONGOOSE (si d'autres validations échouent dans le modèle)
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
  }
};

// --- CONNEXION (Login) ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      
      res.cookie('jwt', generateToken(user._id), {
        httpOnly: true,
        secure: true, // <-- PASSÉ À TRUE (HTTPS)
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

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
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), 
    secure: true,   // <-- PASSÉ À TRUE (HTTPS)
    sameSite: 'lax' 
  });
  
  res.status(200).json({ message: 'Déconnexion réussie' });
};

// --- PROFIL UTILISATEUR (Protégé) ---
exports.getMe = async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    createdAt: req.user.createdAt
  };
  res.status(200).json(user);
};
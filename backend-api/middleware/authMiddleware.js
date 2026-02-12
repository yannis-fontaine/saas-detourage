const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. On cherche le token dans les cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      // 2. On vérifie si le token est valide (signature secrète)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. On récupère les infos de l'utilisateur (sans le mot de passe)
      req.user = await User.findById(decoded.id).select('-password');

      // 4. C'est bon, on laisse passer !
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  } else {
    res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

module.exports = { protect };
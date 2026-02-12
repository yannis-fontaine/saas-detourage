const express = require('express');
const router = express.Router();
// On importe le contrôleur ET le middleware
const { register, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // <--- IMPORT DU VIDEUR

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// --- ROUTE PROTÉGÉE ---
// On met 'protect' AVANT 'getMe'. Le code s'exécute de gauche à droite.
router.get('/me', protect, getMe); 

module.exports = router;
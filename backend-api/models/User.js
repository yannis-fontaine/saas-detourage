const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Impossible d'avoir 2 fois le même email
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Sécurité minimum
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// --- HOOK DE SÉCURITÉ ---
// Avant de sauvegarder ("save") l'utilisateur, on crypte son mot de passe
userSchema.pre('save', async function() {
  // Si le mot de passe n'a pas été modifié, on ne fait rien (on quitte la fonction)
  if (!this.isModified('password')) return;

  // On génère un "sel" (salt) et on hache le mot de passe
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour vérifier le mot de passe plus tard (lors du Login)
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
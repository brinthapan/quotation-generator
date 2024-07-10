const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema with username, email, and password fields
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create a User model from the schema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = { User };

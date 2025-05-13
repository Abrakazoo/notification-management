const users = require('../models/userModel');

exports.getUserById = (userId) => {
  return users.find(user => user.userId === userId);
};

exports.getUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

exports.updatePreferences = (email, preferences) => {
  const user = this.getUserByEmail(email);
  if (!user) return null;

  user.preferences = { ...user.preferences, ...preferences };
  return user;
};

exports.createUser = (email, telephone, preferences) => {
  if (this.getUserByEmail(email)) {
    throw new Error('User already exists');
  }

  const newUser = {
    userId: users.length + 1,
    email,
    telephone,
    preferences: { email: false, sms: false, ...preferences }, // Default preferences
  };

  users.push(newUser);
  return newUser;
};

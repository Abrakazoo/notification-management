const axios = require('axios');
const users = require('../models/userModel');

exports.sendNotification = async (req, res) => {
  const { userId, message } = req.body;
  const user = users.find(u => u.userId === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { preferences, email, telephone } = user;
  const responses = [];

  try {
    if (preferences.email) {
      const emailResponse = await axios.post('http://localhost:5001/send-email', {
        email,
        message,
      });
      responses.push({ channel: 'email', response: emailResponse.data });
    }

    if (preferences.sms) {
      const smsResponse = await axios.post('http://localhost:5001/send-sms', {
        telephone,
        message,
      });
      responses.push({ channel: 'sms', response: smsResponse.data });
    }

    res.status(200).json({ status: 'sent', responses });
  } catch (error) {
    console.error('Error sending notification:', error.message);
    res.status(500).json({ error: 'Failed to send notification', details: error.message });
  }
};

exports.editPreferences = (req, res) => {
  const { email, preferences } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.preferences = preferences;
  res.status(200).json({ message: 'Preferences updated', user });
};

exports.createPreferences = (req, res) => {
  const { email, telephone, preferences } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = {
    userId: users.length + 1,
    email,
    telephone,
    preferences
  };

  users.push(newUser);
  res.status(201).json({ message: 'User created', newUser });
};
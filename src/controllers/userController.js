const userService = require('../services/userService');
const notificationService = require('../services/notificationService');

exports.sendNotification = async (req, res) => {
  const { userId, message } = req.body;

  try {
    const user = userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const responses = await notificationService.sendNotifications(user, message);
    res.status(200).json({ status: 'sent', responses });
  } catch (error) {
    console.error('Error sending notification:', error.message);
    res.status(500).json({ error: 'Failed to send notification', details: error.message });
  }
};

exports.editPreferences = (req, res) => {
  const { email, preferences } = req.body;

  try {
    const updatedUser = userService.updatePreferences(email, preferences);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Preferences updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating preferences:', error.message);
    res.status(500).json({ error: 'Failed to update preferences', details: error.message });
  }
};

exports.createPreferences = (req, res) => {
  const { email, telephone, preferences } = req.body;

  try {
    const newUser = userService.createUser(email, telephone, preferences);
    res.status(201).json({ message: 'User created', newUser });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(400).json({ error: error.message });
  }
};
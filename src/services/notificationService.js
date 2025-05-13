const axios = require('axios');

const notificationHandlers = {
  email: async (user, message) => {
    return await axios.post('http://localhost:5001/send-email', {
      email: user.email,
      message,
    });
  },
  sms: async (user, message) => {
    return await axios.post('http://localhost:5001/send-sms', {
      telephone: user.telephone,
      message,
    });
  },
};

exports.sendNotifications = async (user, message) => {
  const responses = [];
  for (const [channel, enabled] of Object.entries(user.preferences)) {
    if (enabled && notificationHandlers[channel]) {
      const response = await notificationHandlers[channel](user, message);
      responses.push({ channel, response: response.data });
    }
  }
  return responses;
};

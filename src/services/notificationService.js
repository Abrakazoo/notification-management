const axios = require('axios');
const http = require('http');
const instance = axios.create({
  httpAgent: new http.Agent({ keepAlive: false}),
});

const notificationHandlers = {
  email: async (user, message) => {
    let data = JSON.stringify({
      email: user.email,
      message,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5001/send-email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await instance(config);

    if (response.status !== 200) {
      throw new Error('Bad response from email service');
    }
    console.log('Email sent successfully:', JSON.stringify(response.data));

    return response;

  },
  sms: async (user, message) => {
    let data = JSON.stringify({
      telephone: user.telephone,
      message,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5001/send-sms',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await instance(config);

    if (response.status !== 200) {
      throw new Error('Bad response from email service');
    }
    console.log('SMS sent successfully:', JSON.stringify(response.data));

    return response;
  }
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

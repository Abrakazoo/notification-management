const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`User Notifications Manager running on port ${PORT}`);
});
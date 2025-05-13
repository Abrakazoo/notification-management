const express = require('express');
const { sendNotification, editPreferences, createPreferences } = require('../controllers/userController');

const router = express.Router();

router.post('/send-notification', sendNotification);
router.put('/edit-preferences', editPreferences);
router.post('/create-preferences', createPreferences);

module.exports = router;
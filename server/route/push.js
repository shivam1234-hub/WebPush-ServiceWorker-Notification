const router = require('express').Router();
const mongoose = require('mongoose');
const NotificationModel = require('../model/subscription');
const PushNotification = require('../controllers/pushNotification')


router.post('/send-notification',PushNotification)


module.exports = router;
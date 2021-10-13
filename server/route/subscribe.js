
const express = require('express');
const router = express.Router();

const subscribeNotification=require('../controllers/subscribeNotification')

//Post route of subscribe url is as http://host:4000/subscribe

router.post('/',subscribeNotification)

module.exports=router;
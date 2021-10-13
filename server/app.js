const express = require('express');
const cors = require('cors');
const webpush = require('web-push');
const app = express();
const port = 4000;

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const connectDB = require('./db/connection');
const pushRoute= require('./route/push');
const subscribeRoute=require('./route/subscribe');




connectDB();


app.use('/subscribe',subscribeRoute);
app.use(pushRoute);





app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});








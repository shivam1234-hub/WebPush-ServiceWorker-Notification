Created a Notification feature in simple  Website  using Service Worker and Push Service in reactjs , nodejs and mongoDB(for database)

This includes a form which have the body of notification so that we can dynamically render the content of notification 

To run this clone it in your local system 

cd client 

npm install

before running app,run these two commands to get  the Vapid Keys and use this key in  public/service.js(in client folder) and controllers/pushNotification(in server folder)

npm install -g web-push

web-push generate-vapid-keys

npm start

cd server

npm install

nodemon app.js



Then for first time if you open the react app the service worker will register  and again you referesh your app it will save the subscription to the backend
(you will able to see the message "Subscription saved")  now you can  fill the form and click "Send notification" and a then  notification will popup on you screen :)


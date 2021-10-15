

const urlB64ToUint8Array = base64String => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
  
  const saveSubscription = async subscription => {
    const SERVER_URL = "http://localhost:4000/subscribe";
    const response = await fetch(SERVER_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(subscription)
    });
    return response.json();
  };
  
  self.addEventListener("install", async () => {
     try {
      const applicationServerKey = urlB64ToUint8Array(
        "BGAFZ9hQZDF4GhJ_NWZkZWbt3U8X6hzjp9Hm_rFig7DZTcaZFyNgLaHqV71_9OhkqC47PKGdnuWrqRjJ4pvPed8"
      );
      const options = { applicationServerKey, userVisibleOnly: true };
      const subscription = await self.registration.pushManager.subscribe(options);
      const response = await saveSubscription(subscription);
      console.log(response);
    } catch (err) {
      console.log("Error", err);
    }
  });

  let notificationUrl = '';
  
  self.addEventListener("push", function(event) {


    let data = event.data ? JSON.parse(event.data.text()) : {};
    notificationUrl = data.redirecturl;
       
    if (event.data) {

        return self.registration.showNotification(data.title, {
            body: data.message,
            icon:"./ktj.jpg",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            image:data.imageurl,
          });
    } else {
      console.log("Push event but no data");
    }
  });

  self.addEventListener('notificationclick', function(event) {
    let url = notificationUrl;
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
    
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
               
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
          
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

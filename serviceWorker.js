const check = () => {
  console.log(navigator);
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

const permissiondenied = async () => {
  console.log("User denied permission");
  navigator.serviceWorker.getRegistrations().then(registrations => {

    console.log(registrations);

    if (registrations) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
        console.log(registrations);
      });
    }

  });

  return;
}

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("service.js");
  console.log(swRegistration);


  return swRegistration;
};

const requestNotificationPermission = async () => {

  console.log(Notification.permission)


  if (Notification.permission === "granted") {
    await registerServiceWorker();
  }
  else if (Notification.permission === "denied") {
    await permissiondenied();
  }
  else {
    const permission = await window.Notification.requestPermission();

    if (permission === "granted")
      await registerServiceWorker();
    else if (permission === "denied") {
      await permissiondenied();
    }

  }

};

const Main = async () => {
  check();
  await requestNotificationPermission();
};

export default Main;


importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyDt_B4xdUHmXE3c1KzUIaGXnu6DF1DPv6o',
  authDomain: 'gomgom-5f801.firebaseapp.com',
  projectId: 'gomgom-5f801',
  storageBucket: 'gomgom-5f801.appspot.com',
  messagingSenderId: '648358836971',
  appId: '1:648358836971:web:8324e3bcd408694e605cae',
  measurementId: 'G-L26D3ED5XE',
});

const firebaseMessaging = firebase.messaging();

firebaseMessaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
      clients
        .matchAll({
          type: 'window',
        })
        .then((clientList) => {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client) return client.focus();
          }
          if (self.clients.openWindow)
            return self.clients.openWindow(
              `https://www.gomgom.site/${payload.data.link}`,
            );
        }),
    );
  });
});

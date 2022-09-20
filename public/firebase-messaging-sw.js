// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyDt_B4xdUHmXE3c1KzUIaGXnu6DF1DPv6o',
  authDomain: 'gomgom-5f801.firebaseapp.com',
  projectId: 'gomgom-5f801',
  storageBucket: 'gomgom-5f801.appspot.com',
  messagingSenderId: '648358836971',
  appId: '1:648358836971:web:8324e3bcd408694e605cae',
  measurementId: 'G-L26D3ED5XE',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const firebaseMessaging = firebase.messaging();

firebaseMessaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

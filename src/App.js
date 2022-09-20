import React, { useState } from 'react';
import Router from './router/router';
import { ThemeProvider } from 'styled-components';
import theme from './shared/themes/Theme';
import GlobalStyles from './shared/themes/GlobalStyles';
import { firebaseApp } from './firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// if (Notification.permission !== 'granted') {
//   try {
//     Notification.requestPermission().then((permission) => {
//       if (permission !== 'granted') return;
//     });
//   } catch (error) {
//     if (error instanceof TypeError) {
//       Notification.requestPermission().then((permission) => {
//         if (permission !== 'granted') return;
//       });
//     } else {
//       console.log(error);
//     }
//   }
// }

const firebaseMessaging = getMessaging(firebaseApp);
getToken(firebaseMessaging, { vapidKey: process.env.REACT_APP_FCM_VAPID_KEY })
  .then((deviceToken) => {
    sessionStorage.setItem('deviceToken', deviceToken);
  })
  .catch((error) => {
    console.log(error);
  });

onMessage(firebaseMessaging, (payload) => {
  console.log(payload);
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (process.env.NODE_ENV === 'production') {
    console.log = function no_console() {};
    console.warn = function () {};
  }

  return (
    <ThemeProvider theme={isDarkMode ? theme.darkTheme : theme.defaultTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import Router from './router/router';

import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { firebaseApp } from './shared/firebase';
import { detectIphone } from './shared/DeviceDetector';
import { refreshTokenAPI } from './shared/refreshToken';
import { isLogin } from './shared/isLogin';

import theme from './shared/themes/Theme';
import GlobalStyles from './shared/themes/GlobalStyles';

import { ThemeProvider } from 'styled-components';
import { useCallback } from 'react';

//아이폰이 아닐때만 작동합니다
if (!detectIphone(window.navigator.userAgent)) {
  const firebaseMessaging = getMessaging(firebaseApp);

  //DeviceToken을 생성합니다
  getToken(firebaseMessaging, { vapidKey: process.env.REACT_APP_FCM_VAPID_KEY })
    .then((deviceToken) => {
      sessionStorage.setItem('deviceToken', deviceToken);
    })
    .catch((error) => {
      console.log(error);
    });

  //포그라운드 시에 알림을 받습니다
  onMessage(firebaseMessaging, (payload) => {
    console.log(payload);
  });
}

//배포 환경 시에 콘솔에 로그와 warning을 지웁니다
if (process.env.NODE_ENV === 'production') {
  console.log = function no_console() {};
  console.warn = function () {};
}

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 로그인이 true면 refreshToken 요청을 보냅니다
  useEffect(() => {
    if (!isLogin()) return;

    refreshTokenAPI();
  }, []);

  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const screenSize = useCallback(() => {
    setVh(window.innerHeight * 0.01);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [vh]);

  useEffect(() => {
    screenSize();
    window.addEventListener('resize', screenSize);

    return () => window.removeEventListener('resize', screenSize);
  }, [screenSize]);

  return (
    <ThemeProvider theme={isDarkMode ? theme.darkTheme : theme.defaultTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;

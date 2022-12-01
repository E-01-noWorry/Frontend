import { useEffect, useState } from "react";
import Router from "router/router";
import _ from "lodash";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "shared/utils/firebase";
import { detectIphone } from "shared/utils/deviceDetector";
import { refreshTokenAPI } from "shared/utils/refreshToken";
import { userStorage } from "shared/utils/localStorage";

import theme from "shared/themes/theme";
import GlobalStyles from "shared/themes/GlobalStyles";
import { ThemeProvider } from "styled-components";

//아이폰이 아닐때만 작동합니다
if (!detectIphone(window.navigator.userAgent)) {
  const firebaseMessaging = getMessaging(firebaseApp);

  //DeviceToken을 생성합니다
  getToken(firebaseMessaging, { vapidKey: process.env.REACT_APP_FCM_VAPID_KEY })
    .then((deviceToken) => {
      sessionStorage.setItem("deviceToken", deviceToken);
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
if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function () {};
}

const App = () => {
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    const screenSize = _.debounce(() => {
      setVh(window.innerHeight * 0.01);
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }, 100);

    window.addEventListener("resize", screenSize);
    return () => window.removeEventListener("resize", screenSize);
  }, [vh]);

  // 로그인이 true면 refreshToken 요청을 보냅니다
  useEffect(() => {
    if (!userStorage.getToken()) return;

    refreshTokenAPI();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;

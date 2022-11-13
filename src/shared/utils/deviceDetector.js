export const detectInAppBrowser = (agent) => {
  const inappRegex = [
    /KAKAOTALK/i,
    /Instagram/i,
    /NAVER/i,
    /zumapp/i,
    /Whale/i,
    /Snapchat/i,
    /Line/i,
    /everytimeApp/i,
    /WhatsApp/i,
    /Electron/i,
    /wadiz/i,
    /AliApp/i,
    /FB_IAB/i,
    /FB4A/i,
    /FBAN/i,
    /FBIOS/i,
    /FBSS/i,
    /SamsungBrowser/i,
  ];
  return inappRegex.some((mobile) => agent.match(mobile));
};

export const detectIphone = (agent) => {
  const mobileRegex = [/iPhone/i, /iPad/i, /iPod/i];
  return mobileRegex.some((mobile) => agent.match(mobile));
};

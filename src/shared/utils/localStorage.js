const userStorage = {
  setStorage: (userData) => {
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("nickname", userData.nickname);
    localStorage.setItem("userKey", userData.userKey);
  },

  clearStorage: () => {
    localStorage.clear();
  },

  getToken: () => {
    return localStorage.getItem("accessToken");
  },

  getNickname: () => {
    return localStorage.getItem("nickname");
  },

  getUserKey: () => {
    return Number(localStorage.getItem("userKey"));
  },

  setNickname: (nickname) => {
    localStorage.setItem("nickname", nickname);
  },
};

Object.freeze(userStorage);

export { userStorage };

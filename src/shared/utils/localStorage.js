const userStorage = {
  setStorage: (userData) => {
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("nickname", userData.nickname);
    localStorage.setItem("userKey", userData.userKey);
  },
};

Object.freeze(userStorage);

export { userStorage };

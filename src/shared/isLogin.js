export const isLogin = () => {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
};

import instance from '../app/module/instance';

export const refreshToken = async () => {
  try {
    const data = await instance.get('/user/me');

    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
  } catch (error) {
    console.log(error);
  }
};

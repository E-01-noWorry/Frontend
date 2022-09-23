import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    accessToken: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
  },
});

export default instance;

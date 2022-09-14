import axios from 'axios';

const accessToken = localStorage.getItem('token');

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});

export default instance;

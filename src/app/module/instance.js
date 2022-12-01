import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
    refreshToken: `Bearer ${localStorage.getItem("refreshToken")}`,
  },
});

instance.interceptors.request.use((config) => {
  config.headers.accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
  config.headers.refreshToken = `Bearer ${localStorage.getItem("refreshToken")}`;

  return config;
});

instance.interceptors.response.use(
  (config) => {
    if (config.status === 201 && config.data.msg.includes("재발급")) {
      return axios({
        ...config.config,
        headers: {
          accessToken: `Bearer ${config.data.accessToken}`,
          refreshToken: `Bearer ${config.data.refreshToken}`,
        },
      }).then(() => {
        localStorage.setItem("accessToken", config.data.accessToken);
        localStorage.setItem("refreshToken", config.data.refreshToken);
      });
    } else {
      return config;
    }
  },

  (error) => {
    if (error.response.status === 401 && error.response.data.errMsg.includes("만료")) {
      localStorage.clear();
    }
    return Promise.reject(error);
  },
);

export default instance;

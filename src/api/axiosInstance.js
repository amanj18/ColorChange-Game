import axios from 'axios';
import { getCookie } from 'utils/commonFunctions';
import config from 'utils/config';

const createAxiosInstance = (baseURL) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      entity: config.entity,
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const cookie = getCookie('ea-fan')
      const existingCookie = cookie && JSON.parse(cookie);

      if (config.url.includes("fan-login")) {
        let tokenData = localStorage.getItem("token")
        config.headers = {
          ...config.headers,
          "x-eags-token": tokenData ?tokenData: console.log("==================>"),
        };
      } else if(existingCookie && config.url.includes("/services")){
        config.headers = {
          ...config.headers,
          "eags-userid": existingCookie?.game_session_token,
        };
      }else {
        config.headers = {
          ...config.headers
        }
      }

      let buster;
      if (config.addBuster) {
        buster = Date.now();
      }

      config.params = {
        ...config.params,
        buster
      };

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response?.data?.Meta?.Success === false) {
        return Promise.reject({
          data: response?.data?.Meta
        });
      }
      if (response?.data?.Data?.Value !== undefined) {
        response.data = response?.data?.Data?.Value;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;

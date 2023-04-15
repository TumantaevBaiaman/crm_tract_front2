import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import * as url from "./url_helper";
import {POST_JWT_REFRESH} from "./url_helper";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "https://backapt.com";

const axiosApi = axios.create({
  baseURL: API_URL,
});

export async function get(url, config = {}) {
  return await axiosApi
      .get(url, { ...config })
      .then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}

axiosApi.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken && config.headers) {
      config.headers['Authorization'] = `JWT ${accessToken}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

const refreshRequest = async (refresh, access) => {
    try {
        const { data } = await axios.post(API_URL+POST_JWT_REFRESH, {
          refresh
        })
        if (data?.access) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
        }

        return data
    } catch (err) {
        return err
    }
}

axiosApi.interceptors.response.use(
  async (response) => {
      if (response.status === 401) {
        const refresh_token = localStorage.getItem("refresh_token")
        const access_token = localStorage.getItem("access_token")

        await refreshRequest(refresh_token, access_token)
      }
      return response;
  },
  async (error) => {
      const refresh_token = localStorage.getItem("refresh_token")
      const access_token = localStorage.getItem("access_token")
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        return await refreshRequest(refresh_token, access_token).finally(() => {
          return axiosApi(originalRequest)
        })
      }
      return Promise.reject(error);
  },
);

export default API_URL

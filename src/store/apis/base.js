import axios from 'axios';
import { getAccessToken, getRefreshToken, isAceessToken, isRefreshToken } from 'store/utils/function';

// baseurl
// export const baseURL = "http://54.180.60.149:3000";
export const baseURL = "http://10.10.10.44:3000";

const checkAccessToken = () => {
  if (isAceessToken()) {
    return `Bearer ${getAccessToken()}`;
  }
  return ``;
};

const checkRefreshToken = () => {
  if (isRefreshToken()) {
    return `Bearer ${getRefreshToken()}`;
  }
  return ``;
};

// 로컬에서 토큰 가져오기
export let ACCESS_TOKEN = checkAccessToken();
export let REFRESH_TOKEN = checkRefreshToken();

// interceptors.request
axios.interceptors.request.use(
  (config) => {

    console.log("interceptors request");
    
    const accessToken = localStorage.getItem("accesstoken");
    const refreshToken = localStorage.getItem("refreshtoken");

    config.headers.accessToken = `Bearer ${accessToken}`;
    // config.headers.refreshToken = `Bearer ${refreshToken}`;
    config.headers.refreshToken = `${refreshToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptors.response
axios.interceptors.response.use(
  (response) => {

    console.log("interceptors response");
    console.log("base >> ", response);

    if(response.data === "REFRESH_YES") {
      // console.log("토큰 저장 이프문");
      const { accesstoken } = response.headers;
      localStorage.setItem("accesstoken", accesstoken);
      return axios(response.config);
    }

    return response;
  },
  (error) => {
    console.error(error);

    if(error.response.status === 403 && error.response.data === "REFRESH_NO") {

      // console.log("403 이프문 들어옴");

      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("convSeq");
      localStorage.removeItem("branchName");

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

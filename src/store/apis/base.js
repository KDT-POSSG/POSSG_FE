import axios from 'axios';
import { getAccessToken, getRefreshToken } from 'store/utils/function';

// baseurl
export const baseURL = "http://54.180.60.149:3000";

// 로컬에서 토큰 가져오기
export let ACCESS_TOKEN = getAccessToken();
export let REFRESH_TOKEN = getRefreshToken();

// TOKEN X 
export const publicRequest = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TOKEN O
export const basicRequest = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    accessToken: `Bearer ${ACCESS_TOKEN}`,
    refreshToken: `${REFRESH_TOKEN}`,
  },
});

// token 처리
// basicRequest.interceptors.response.use(

//   (response) => {
//     console.log("base >> ", response);
//     console.log("base >> ", response.headers);
//     console.log("base >> ", response.data);

//     // REFRESH_YES + headers에 새로운 accessToken
//     // localStorage에 토큰 저장

//     return response;
//   },
//   (error) => {
//     console.error(error);
    
//     if (error.response.status === 403) {
//       // localStorage 비우기
//       // 토스트
//       // 로그인 페이지로 이동
//     }

//     return Promise.reject(error);
//   }
// );

// form-data 확인 필요

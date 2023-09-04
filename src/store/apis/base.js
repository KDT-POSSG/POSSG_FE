import axios from 'axios';

// baseurl
export const baseURL = "http://10.10.10.81:3000";

// 요청
export const basicRequest = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
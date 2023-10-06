import axios from 'axios';

// baseurl
export const baseURL = "http://54.180.60.149:3000";
// export const baseURL = "http://10.10.10.207:3000";

export const ACCESS_TOKEN = localStorage.getItem("accesstoken");
// export const CONV_SEQ = localStorage.getItem("convSeq");
export const CONV_SEQ = 1;

// TOKEN X 
export const nonTokenRequest = axios.create({
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
    Authorization: `Bearer ${ACCESS_TOKEN}`
  },
});
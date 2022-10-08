import axios from 'axios';
import decode from 'jwt-decode';

function getJWT() {
  return localStorage.getItem('academind_passport')
    ? JSON.parse(localStorage.getItem('academind_passport'))
    : null;
}

const token = getJWT();

const controller = new AbortController();

const refresher = axios.create({
  baseURL: 'http://localhost:4000/api/v1/authentication/refresh',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getJWT()}`,
  },
  method: 'GET',
  signal: controller.signal,
});

export const axioss = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const axiosQuery = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const axiosFormDataQuery = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'multipart/form-data',
  },
});

axiosQuery.interceptors.request.use(async (config) => {
  if (!token) {
    console.log('runs first check');
    config.headers.authorization = `Bearer ${getJWT()}`;
  }

  const decodedData = token && decode(token);
  const exp = decodedData?.exp;

  if (Math.floor(Date.now() / 1000) > exp) {
    const { data } = await refresher();
    console.log('runs assign new token', {
      currDate: Math.floor(Date.now() / 1000),
      exp,
      newDecoded: decode(data.accessToken).exp,
    });
    localStorage.setItem('academind_passport', JSON.stringify(data.accessToken));
    config.headers.authorization = `Bearer ${data.accessToken}`;
  }

  return config;
});

axiosFormDataQuery.interceptors.request.use(async (config) => {
  if (!token) config.headers.authorization = `Bearer ${getJWT()}`;

  const decodedData = token && decode(token);
  const exp = decodedData?.exp;
  if (Math.floor(Date.now() / 1000) > exp) {
    const { data } = await refresher();
    localStorage.setItem('academind_passport', JSON.stringify(data.accessToken));
    config.headers.authorization = `Bearer ${data.accessToken}`;
  }

  return config;
});

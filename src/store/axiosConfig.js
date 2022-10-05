import axios from 'axios';
import decode from 'jwt-decode';

// export let axiosQuery;
export let axiosFormDataQuery;

// export function createAxiosQuery() {
//   const JWT_TOKEN = JSON.parse(localStorage.getItem('academind_passport'));
//   axiosQuery = axios.create({
//     baseURL: 'http://localhost:4000/api/v1',
//     withCredentials: true,
//     headers: {
//       Authorization: `Bearer ${JWT_TOKEN}`,
//       'content-type': 'application/json',
//     },
//   });

//   axiosFormDataQuery = axios.create({
//     baseURL: 'http://localhost:4000/api/v1',
//     withCredentials: true,
//     headers: {
//       Authorization: `Bearer ${JWT_TOKEN}`,
//       'content-type': 'multipart/form-data',
//     },
//   });
// }

// createAxiosQuery();

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

export const axiosQuery = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

axiosQuery.interceptors.request.use(async (config) => {
  if (!token) config.headers.authorization = `Bearer ${getJWT()}`;

  const decodedData = token && decode(token);
  const exp = decodedData?.exp;
  if (Date.now() > exp) {
    const { data } = await refresher();
    localStorage.setItem('academind_passport', JSON.stringify(data.accessToken));
    config.headers.authorization = `Bearer ${data.accessToken}`;
  }

  return config;
});

// axiosQuery.interceptors.response.use(
//   (response) => response,
//   async (err) => {
//     const config = err.config;
//     const error = err.response.data;

//     if (error.message === 'jwt expired') return await revalidateToken(config);

//     return Promise.reject(error);
//   }
// );

// async function revalidateToken(config) {
//   config.sent = true;

//   const { data } = await refresher();
//   localStorage.setItem('academind_passport', JSON.stringify(data.refreshToken));
//   return axiosQuery(config);
// }

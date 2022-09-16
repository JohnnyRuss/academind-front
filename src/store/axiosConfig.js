import axios from 'axios';

export let axiosQuery;

export function createAxiosQuery() {
  const JWT_TOKEN = JSON.parse(localStorage.getItem('academind_passport'));
  axiosQuery = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      'content-type': 'multipart/form-data',
    },
  });
}

createAxiosQuery();

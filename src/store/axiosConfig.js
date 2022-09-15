import axios from 'axios';
const JWT_TOKEN = JSON.parse(localStorage.getItem('academind_passport'));

export const axiosQuery = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
    'content-type': 'application/json',
  },
});

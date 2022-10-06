import { axiosQuery, axioss } from '../../axiosConfig';

async function loginQuery(body) {
  return await axiosQuery.post('/authentication/login', body);
}

async function logOutQuery(body) {
  return await axioss.post('/authentication/logout', body);
}

export { loginQuery, logOutQuery };

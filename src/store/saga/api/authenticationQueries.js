import { axiosQuery } from '../../axiosConfig';

async function loginQuery(body) {
  return await axiosQuery.post('authentication/login', body);
}

export { loginQuery };

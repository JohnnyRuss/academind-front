import { axiosQuery, axioss } from "../../axiosConfig";

export async function loginQuery(body) {
  return await axiosQuery.post("/authentication/login", body);
}

export async function logOutQuery(body) {
  return await axioss.post("/authentication/logout", body);
}

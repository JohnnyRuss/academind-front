import { axiosQuery, axioss } from "../../axiosConfig";

export async function loginQuery(body) {
  return await axiosQuery.post("/authentication/login", body);
}

export async function logOutQuery(body) {
  return await axioss.post("/authentication/logout", body);
}

export async function checkRegistrationExistanceQuery({
  requestId,
  tokenId,
  body,
}) {
  return await axioss(
    `/authentication/confirm-register/${requestId}/confirm/${tokenId}`
  );
}

export async function sendRegistrationPasswordConfirmQuery({
  requestId,
  tokenId,
  body,
}) {
  return await axioss.post(
    `/authentication/confirm-register/${requestId}/confirm/${tokenId}`,
    body
  );
}

export async function sendRegistrationRequestQuery(body) {
  return await axioss.post("/authentication/register", body);
}

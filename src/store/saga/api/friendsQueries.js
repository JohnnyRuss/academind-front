import { axiosQuery } from '../../axiosConfig';

async function querySendRequest(userId) {
  return await axiosQuery.post(`/user/${userId}/request`);
}

async function queryCancelRequest(userId) {
  return await axiosQuery.patch(`/user/${userId}/cancel-request`);
}

async function queryDeleteRequest(userId) {
  return await axiosQuery.post(`/user/${userId}/cancel-request`);
}

async function queryConfirmRequest(userId) {
  return await axiosQuery.patch(`/user/${userId}/request`);
}

async function queryDeleteFriend(userId) {
  return await axiosQuery.delete(`/user/${userId}/friends`);
}

async function queryGetAllFriends(userId) {
  return await axiosQuery(`/user/${userId}/friends`);
}

async function queryGetPendingRequests(userId) {
  return await axiosQuery(`/user/${userId}/pending-requests`);
}

async function queryGetSentRequests(userId) {
  return await axiosQuery(`/user/${userId}/sent-requests`);
}

export {
  querySendRequest,
  queryCancelRequest,
  queryDeleteRequest,
  queryConfirmRequest,
  queryDeleteFriend,
  queryGetAllFriends,
  queryGetPendingRequests,
  queryGetSentRequests,
};

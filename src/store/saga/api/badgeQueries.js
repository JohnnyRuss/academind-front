import { axiosQuery } from "../../axiosConfig";

export async function getRequestCountQuery(userId) {
  return await axiosQuery(`/user/${userId}/pending-requests/count`);
}

export async function getMessageCountQuery(userId) {
  return await axiosQuery(`/conversation/${userId}/unread`);
}

export async function getNotificationCountQuery(userId) {
  return await axiosQuery(`/notifications/${userId}/count`);
}

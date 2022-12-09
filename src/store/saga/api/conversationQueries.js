import { axiosQuery } from "../../axiosConfig";

export async function queryGetAllConversations(userId) {
  return await axiosQuery(`/conversation/${userId}/all`);
}

export async function queryGetLastConversation(userId) {
  return await axiosQuery(`/conversation/${userId}/last`);
}

export async function queryGetConversation(conversationId) {
  return await axiosQuery(`/conversation/${conversationId}`);
}

export async function queryDeleteConversation(conversationId) {
  return await axiosQuery.delete(`/conversation/${conversationId}`);
}

export async function sendMessageQuery({ adressatId, body }) {
  return await axiosQuery.patch(`/conversation/${adressatId}`, body);
}

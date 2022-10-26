import { axiosQuery } from '../../axiosConfig';

async function queryGetAllConversations(userId) {
  return await axiosQuery(`/conversation/${userId}/all`);
}

async function queryGetLastConversation(userId) {
  return await axiosQuery(`/conversation/${userId}/last`);
}

async function queryGetConversation(conversationId) {
  return await axiosQuery(`/conversation/${conversationId}`);
}

export { queryGetAllConversations, queryGetLastConversation, queryGetConversation };

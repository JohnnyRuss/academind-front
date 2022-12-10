import { takeLatest } from "redux-saga/effects";

import {
  getAllConversations,
  getLastConversation,
  getConversation,
  deleteConversation,
  sendMessage,
  markAsRead,
} from "../../reducers/conversationReducer";

import {
  getAllConversationsHandler,
  getConversationHandler,
  getLastConversationHandler,
  deleteConversationHandler,
  sendMessageHandler,
  markAsReadHandler,
} from "../handlers/conversationHandlers";

function* converastionSaga() {
  yield takeLatest(getAllConversations, getAllConversationsHandler);
  yield takeLatest(getLastConversation, getLastConversationHandler);
  yield takeLatest(getConversation, getConversationHandler);
  yield takeLatest(deleteConversation, deleteConversationHandler);
  yield takeLatest(sendMessage, sendMessageHandler);
  yield takeLatest(markAsRead, markAsReadHandler);
}

export default converastionSaga;

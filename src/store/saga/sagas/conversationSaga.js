import { takeLatest, takeEvery } from "redux-saga/effects";

import {
  getAllConversations,
  getLastConversation,
  getConversation,
  deleteConversation,
  sendMessage,
} from "../../reducers/conversationReducer";

import {
  getAllConversationsHandler,
  getConversationHandler,
  getLastConversationHandler,
  deleteConversationHandler,
  sendMessageHandler,
} from "../handlers/conversationHandlers";

function* converastionSaga() {
  yield takeLatest(getAllConversations, getAllConversationsHandler);
  yield takeLatest(getLastConversation, getLastConversationHandler);
  yield takeLatest(getConversation, getConversationHandler);
  yield takeLatest(deleteConversation, deleteConversationHandler);
  yield takeLatest(sendMessage, sendMessageHandler);
}

export default converastionSaga;

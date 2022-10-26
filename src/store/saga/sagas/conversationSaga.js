import { takeLatest, takeEvery } from 'redux-saga/effects';

import {
  getAllConversations,
  getLastConversation,
  getConversation,
} from '../../reducers/conversationReducer';

import {
  getAllConversationsHandler,
  getConversationHandler,
  getLastConversationHandler,
} from '../handlers/conversationHandlers';

function* converastionSaga() {
  yield takeLatest(getAllConversations, getAllConversationsHandler);
  yield takeLatest(getLastConversation, getLastConversationHandler);
  yield takeLatest(getConversation, getConversationHandler);
}

export default converastionSaga;

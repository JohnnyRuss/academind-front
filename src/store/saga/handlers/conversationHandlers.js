import { call, put } from 'redux-saga/effects';

import {
  setAllConversations,
  setActiveConversation,
  setDeletedConversation,
} from '../../reducers/conversationReducer';

import {
  queryGetAllConversations,
  queryGetLastConversation,
  queryGetConversation,
  queryDeleteConversation,
} from '../api/conversationQueries';

export function* getAllConversationsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetAllConversations, userId);
    yield put(setAllConversations(data));
  } catch (error) {
    showError(error, 'getAllConversationsHandler');
  }
}

export function* getLastConversationHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetLastConversation, userId);
    yield put(setActiveConversation(data));
  } catch (error) {
    showError(error, 'getLastConversationHandler');
  }
}

export function* getConversationHandler({ payload: conversationId }) {
  try {
    const { data } = yield call(queryGetConversation, conversationId);
    yield put(setActiveConversation(data));
  } catch (error) {
    showError(error, 'getConversationHandler');
  }
}

export function* deleteConversationHandler({ payload: conversationId }) {
  try {
    yield call(queryDeleteConversation, conversationId);
    yield put(setDeletedConversation(conversationId));
  } catch (error) {
    showError(error, 'getConversationHandler');
  }
}

function showError(error, location) {
  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error?.response?.data?.message || error.message,
    err: error,
    stack: error.stack,
  });
}

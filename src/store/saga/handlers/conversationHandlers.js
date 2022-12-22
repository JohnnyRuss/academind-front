import { call, put } from "redux-saga/effects";
import { showError, triggerError } from "./errorHandler";

import {
  setConversationError,
  setAllConversations,
  setActiveConversation,
  setNewConversation,
  setDeletedConversation,
  setNewMessage,
  setMarkAsRead,
} from "../../reducers/conversationReducer";

import {
  queryGetAllConversations,
  queryGetLastConversation,
  queryGetConversation,
  queryDeleteConversation,
  sendMessageQuery,
  markAsReadQuery,
} from "../api/conversationQueries";

export function* getAllConversationsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetAllConversations, userId);
    yield put(setAllConversations(data));
  } catch (error) {
    yield showError({
      error,
      location: "getAllConversationsHandler",
      setter: setConversationError,
      setterParams: {
        key: "getAllLoadingState",
      },
    });
  }
}

export function* getLastConversationHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetLastConversation, userId);
    yield put(setActiveConversation(data));
  } catch (error) {
    yield showError({
      error,
      location: "getLastConversationHandler",
      setter: setConversationError,
      setterParams: {
        key: "loadingState",
      },
    });
  }
}

export function* getConversationHandler({ payload: conversationId }) {
  try {
    const { data } = yield call(queryGetConversation, conversationId);
    yield put(setActiveConversation(data));
  } catch (error) {
    yield showError({
      error,
      location: "getConversationHandler",
      setter: setConversationError,
      setterParams: {
        key: "loadingState",
      },
    });
  }
}

export function* getNewConversationHandler({ payload: conversationId }) {
  try {
    const { data } = yield call(queryGetConversation, conversationId);
    yield put(setNewConversation(data));
  } catch (error) {
    yield showError({ error, location: "getNewConversationHandler" });
  }
}

export function* sendMessageHandler({
  payload: { adressatId, conversationId, body },
}) {
  try {
    const { data } = yield call(sendMessageQuery, {
      conversationId,
      adressatId,
      body,
    });
    yield put(setNewMessage(data));
  } catch (error) {
    yield showError({
      error,
      location: "sendMessageHandler",
      setter: setConversationError,
      setterParams: {
        key: "chatLoadingState",
        task: "send",
      },
    });
  }
}

export function* markAsReadHandler({ payload }) {
  try {
    triggerError();
    const { data } = yield call(markAsReadQuery, payload);
    yield put(setMarkAsRead(data));
  } catch (error) {
    yield showError({
      error,
      location: "markAsReadHandler",
      setter: setConversationError,
      setterParams: {
        key: "chatLoadingState",
        task: "mark",
      },
    });
  }
}

export function* deleteConversationHandler({ payload: conversationId }) {
  try {
    triggerError();
    yield call(queryDeleteConversation, conversationId);
    yield put(setDeletedConversation(conversationId));
  } catch (error) {
    yield showError({
      error,
      location: "deleteConversationHandler",
      setter: setConversationError,
      setterParams: {
        key: "chatLoadingState",
        task: "deletion",
      },
    });
  }
}

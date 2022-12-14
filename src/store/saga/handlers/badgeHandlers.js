import { call, put } from "redux-saga/effects";
import { showError } from "./errorHandler";

import {
  getUnseenRequestsCountQuery,
  markRequestsAsSeenQuery,
  getUnseenConversationsCountQuery,
  markConversationsAsSeenQuery,
  getNotificationCountQuery,
  markNotificationsAsSeenQuery,
} from "../api/badgeQueries";

import {
  setUnseenRequestsCount,
  setResetedRequestsCount,
  setUnseenConversationsCount,
  setResetedConversationsCount,
  setUnseenNotificationsCount,
  setResetedNotificationsCount,
} from "../../reducers/badgeReducer";

export function* getUnseenRequestCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getUnseenRequestsCountQuery, userId);
    yield put(setUnseenRequestsCount(data));
  } catch (error) {
    showError(error, "getUnseenRequestCountHandler");
  }
}

export function* markRequestsAsSeenHandler({ payload: userId }) {
  try {
    yield call(markRequestsAsSeenQuery, userId);
    yield put(setResetedRequestsCount());
  } catch (error) {
    showError(error, "markRequestsAsSeenHandler");
  }
}

export function* getUnseenConversationsCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getUnseenConversationsCountQuery, userId);
    yield put(setUnseenConversationsCount(data));
  } catch (error) {
    showError(error, "getUnseenConversationsCountHandler");
  }
}

export function* markConversationsAsSeenHandler({ payload: userId }) {
  try {
    yield call(markConversationsAsSeenQuery, userId);
    yield put(setResetedConversationsCount());
  } catch (error) {
    showError(error, "markConversationsAsSeenHandler");
  }
}

export function* getUnseenNotificationsCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getNotificationCountQuery, userId);
    yield put(setUnseenNotificationsCount(data));
  } catch (error) {
    showError(error, "getUnseenNotificationsCountHandler");
  }
}

export function* markNotificationsAsSeenHandler({ payload: userId }) {
  try {
    yield call(markNotificationsAsSeenQuery, userId);
    yield put(setResetedNotificationsCount());
  } catch (error) {
    showError(error, "markNotificationsAsSeenHandler");
  }
}

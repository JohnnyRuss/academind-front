import { call, put } from "redux-saga/effects";

import {
  getUnseenRequestsCountQuery,
  markRequestsAsSeenQuery,
  getUnseenConversationsCountQuery,
  markConversationsAsSeenQuery,
  getNotificationCountQuery,
} from "../api/badgeQueries";

import {
  setUnseenRequestsCount,
  setResetedRequestsCount,
  setUnseenConversationsCount,
  setResetedConversationsCount,
  setNotificationCount,
} from "../../reducers/badgeReducer";

export function* getUnseenRequestCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getUnseenRequestsCountQuery, userId);
    yield put(setUnseenRequestsCount(data));
  } catch (error) {}
}

export function* markRequestsAsSeenHandler({ payload: userId }) {
  try {
    yield call(markRequestsAsSeenQuery, userId);
    yield put(setResetedRequestsCount());
  } catch (error) {}
}

export function* getUnseenConversationsCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getUnseenConversationsCountQuery, userId);
    yield put(setUnseenConversationsCount(data));
  } catch (error) {}
}

export function* markConversationsAsSeenHandler({ payload: userId }) {
  try {
    yield call(markConversationsAsSeenQuery, userId);
    yield put(setResetedConversationsCount());
  } catch (error) {}
}

export function* getNotificationCountHandler({ payload: userId }) {
  try {
    const { data } = yield call(getNotificationCountQuery, userId);
    yield put(setNotificationCount(data));
  } catch (error) {}
}

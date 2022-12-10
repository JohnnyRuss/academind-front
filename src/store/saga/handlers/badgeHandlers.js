import { call, put } from "redux-saga/effects";

import {
  getRequestCountQuery,
  getMessageCountQuery,
  getNotificationCountQuery,
} from "../api/badgeQueries";

import {
  setRequestCount,
  setMessageCount,
  setNotificationCount,
} from "../../reducers/badgeReducer";

export function* getRequestCountHandler({ payload: userId }) {
  const { data } = yield call(getRequestCountQuery, userId);
  yield put(setRequestCount(data));
}

export function* getMessageCountHandler({ payload: userId }) {
  const { data } = yield call(getMessageCountQuery, userId);
  yield put(setMessageCount(data));
}

export function* getNotificationCountHandler({ payload: userId }) {
  const { data } = yield call(getNotificationCountQuery, userId);
  yield put(setNotificationCount(data));
}

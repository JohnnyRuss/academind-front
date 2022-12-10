import { takeLatest } from "redux-saga/effects";

import {
  getRequestCount,
  getMessageCount,
  getNotificationCount,
} from "../../reducers/badgeReducer";

import {
  getRequestCountHandler,
  getMessageCountHandler,
  getNotificationCountHandler,
} from "../handlers/badgeHandlers";

export default function* badgeSaga() {
  yield takeLatest(getRequestCount, getRequestCountHandler);
  yield takeLatest(getMessageCount, getMessageCountHandler);
  yield takeLatest(getNotificationCount, getNotificationCountHandler);
}

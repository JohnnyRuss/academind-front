import { call, put } from "redux-saga/effects";
import { showError } from "./errorHandler";

import { setActiveUser } from "../../reducers/activeUserReducer";

import { loginQuery, logOutQuery } from "../api/authenticationQueries";

export function* loginHandler({ payload }) {
  try {
    const { data } = yield call(loginQuery, payload);
    yield put(setActiveUser(data));
  } catch (error) {
    showError(error, "loginHandler");
  }
}

export function* logOutHandler({ payload }) {
  try {
    yield call(logOutQuery);
  } catch (error) {
    showError(error, "logOutHandler");
  }
}

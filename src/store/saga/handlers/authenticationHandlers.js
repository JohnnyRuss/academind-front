import { call, put } from "redux-saga/effects";
import { showError } from "./errorHandler";

import { setActiveUser } from "../../reducers/activeUserReducer";

import { loginQuery, logOutQuery } from "../api/authenticationQueries";

export function* loginHandler({ payload }) {
  try {
    const { data } = yield call(loginQuery, payload);
    yield put(setActiveUser(data));
  } catch (error) {
    yield showError({ error, location: "loginHandler" });
  }
}

export function* logOutHandler({ payload }) {
  try {
    yield call(logOutQuery);
  } catch (error) {
    yield showError({ error, location: "logOutHandler" });
  }
}

import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import {
  setLoadingStateError,
  setRegistrationError,
  setActiveUser,
  setRegisterSuccess,
  setIsExistingRegister,
  setRegistrationRequestSuccess,
} from "../../reducers/activeUserReducer";

import {
  loginQuery,
  logOutQuery,
  checkRegistrationExistanceQuery,
  sendRegistrationPasswordConfirmQuery,
  sendRegistrationRequestQuery,
} from "../api/authenticationQueries";

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

export function* checkExistingRegisterHandler({
  payload: { requestId, tokenId },
}) {
  try {
    const { data } = yield call(checkRegistrationExistanceQuery, {
      requestId,
      tokenId,
    });

    yield put(setIsExistingRegister(data));
  } catch (error) {
    yield showError({
      error,
      location: "chechExistingRegisterHandler",
      setter: setLoadingStateError,
      setterParams: { message: errorMessages.user.operation },
    });
  }
}

export function* sendRegistrationPasswordConfirmHandler({
  payload: { requestId, tokenId, body },
}) {
  try {
    const { data } = yield call(sendRegistrationPasswordConfirmQuery, {
      body,
      requestId,
      tokenId,
    });
    yield put(setRegisterSuccess(data));
  } catch (error) {
    yield showError({
      error,
      location: "sendRegistrationPasswordConfirmHandler",
      setter: setRegistrationError,
      setterParams: { message: "" },
    });
  }
}

export function* sendRegistrationRequestHandler({ payload }) {
  try {
    yield call(sendRegistrationRequestQuery, payload);
    yield put(setRegistrationRequestSuccess());
  } catch (error) {
    yield showError({
      error,
      location: "sendRegistrationRequest",
      setter: setRegistrationError,
      setterParams: { message: errorMessages.user.sendRegRequest },
    });
  }
}

import { takeLatest } from "redux-saga/effects";

import {
  login,
  logOut,
  checkExistingRegister,
  sendRegisterPasswordConfirm,
  sendRegistrationRequest,
} from "../../reducers/activeUserReducer";

import {
  loginHandler,
  logOutHandler,
  checkExistingRegisterHandler,
  sendRegistrationPasswordConfirmHandler,
  sendRegistrationRequestHandler,
} from "../handlers/authenticationHandlers";

export default function* authenticationSaga() {
  yield takeLatest(sendRegistrationRequest, sendRegistrationRequestHandler);
  yield takeLatest(login, loginHandler);
  yield takeLatest(logOut, logOutHandler);
  yield takeLatest(checkExistingRegister, checkExistingRegisterHandler);
  yield takeLatest(
    sendRegisterPasswordConfirm,
    sendRegistrationPasswordConfirmHandler
  );
}

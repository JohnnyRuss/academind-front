import { takeLatest } from "redux-saga/effects";

import {
  login,
  logOut,
  checkExistingRegister,
  sendRegisterPasswordConfirm,
} from "../../reducers/activeUserReducer";

import {
  loginHandler,
  logOutHandler,
  checkExistingRegisterHandler,
  sendRegistrationPasswordConfirmHandler,
} from "../handlers/authenticationHandlers";

function* authenticationSaga() {
  yield takeLatest(login, loginHandler);
  yield takeLatest(logOut, logOutHandler);
  yield takeLatest(checkExistingRegister, checkExistingRegisterHandler);
  yield takeLatest(
    sendRegisterPasswordConfirm,
    sendRegistrationPasswordConfirmHandler
  );
}

export default authenticationSaga;

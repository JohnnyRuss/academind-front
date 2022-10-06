import { takeLatest } from 'redux-saga/effects';

import { login, logOut } from '../../reducers/activeUserReducer';

import { loginHandler, logOutHandler } from '../handlers/authenticationHandlers';

function* authenticationSaga() {
  yield takeLatest(login, loginHandler);
  yield takeLatest(logOut, logOutHandler);
}

export default authenticationSaga;

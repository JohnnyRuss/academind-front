import { takeLatest } from 'redux-saga/effects';

import { login } from '../../reducers/activeUserReducer';

import { loginHandler } from '../handlers/authenticationHandlers';

function* authenticationSaga() {
  yield takeLatest(login, loginHandler);
}

export default authenticationSaga;

import { call, put } from 'redux-saga/effects';

import { setActiveUser } from '../../reducers/activeUserReducer';

import { loginQuery, logOutQuery } from '../api/authenticationQueries';

function* loginHandler({ payload }) {
  try {
    const { data } = yield call(loginQuery, payload);
    yield put(setActiveUser(data));
  } catch (error) {
    showError(error, 'loginHandler');
  }
}

function* logOutHandler({ payload }) {
  try {
    yield call(logOutQuery);
  } catch (error) {
    showError(error, 'logOutHandler');
  }
}

function showError(error, location) {
  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error?.response?.data?.message || error.message,
    err: error,
    stack: error.stack,
  });
}

export { loginHandler, logOutHandler };

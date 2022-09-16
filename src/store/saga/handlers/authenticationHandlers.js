import { call, put } from 'redux-saga/effects';

import { setActiveUser } from '../../reducers/activeUserReducer';

import { loginQuery } from '../api/authenticationQueries';

function* loginHandler({ payload }) {
  try {
    const { data } = yield call(loginQuery, payload);
    yield put(setActiveUser(data));
  } catch (error) {
    showError(error, 'loginHandler');
  }
}

function showError(error, location) {
  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error.message,
    err: error,
    stack: error.stack,
  });
}

export { loginHandler };

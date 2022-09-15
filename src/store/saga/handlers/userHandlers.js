import { call, put } from 'redux-saga/effects';

import { setUserProfile, setSearchResult } from '../../reducers/userReducer';
import { queryUserProfile, queryUserFeed, queryUserSearch } from '../api/userQueries';

function* getUserProfileHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserProfile, userId);
    yield put(setUserProfile(data));
  } catch (error) {
    console.log({
      error: true,
      location: 'sagaHandler - getUserProfileHandler',
      message: error.message,
      stack: error.stack,
    });
  }
}

function* searchUserHandler({ payload: key }) {
  try {
    const { data } = yield call(queryUserSearch, key);
    yield put(setSearchResult(data));
  } catch (error) {
    console.log({
      error: true,
      location: 'sagaHandler - searchUserHandler',
      message: error.message,
      stack: error.stack,
    });
  }
}

function* getUserFeedHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserFeed, userId);
    // yield put(setUserProfile(data));
  } catch (error) {
    console.log({
      error: true,
      location: 'sagaHandler - getUserProfileHandler',
      message: error.message,
      stack: error.stack,
    });
  }
}

export { getUserProfileHandler, getUserFeedHandler, searchUserHandler };

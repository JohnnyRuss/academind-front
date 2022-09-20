import { call, put } from 'redux-saga/effects';

import {
  setUserProfile,
  setSearchResult,
  resetLoadingState,
  resetNestedLoadingState,
} from '../../reducers/userReducer';
import { setPosts } from '../../reducers/postsDataReducer';

import {
  queryUserProfile,
  queryUserProfilePosts,
  queryUserFeed,
  queryBookmarks,
  queryUserSearch,
} from '../api/userQueries';

function* searchUserHandler({ payload: key }) {
  try {
    const { data } = yield call(queryUserSearch, key);
    yield put(setSearchResult(data));
  } catch (error) {
    showError(error, 'searchUserHandler');
  }
}

function* getUserProfileHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserProfile, userId);
    yield put(setUserProfile(data));
    yield put(resetLoadingState());
  } catch (error) {
    showError(error, 'getUserProfileHandler');
  }
}

function* getProfilePostsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserProfilePosts, userId);
    yield put(setPosts(data));
  } catch (error) {
    showError(error, 'getProfilePostsHandler');
  }
}

function* getUserFeedHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserFeed, userId);
    yield put(setPosts(data));
    yield put(resetLoadingState());
  } catch (error) {
    showError(error, 'getUserFeedHandler');
  }
}

function* getBookmarksHandler({ payload }) {
  try {
    const { data } = yield call(queryBookmarks, payload);
    yield put(setPosts(data));
    yield put(resetNestedLoadingState());
  } catch (error) {
    showError(error, 'getBookmarksHandler');
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

export {
  getUserProfileHandler,
  getProfilePostsHandler,
  getUserFeedHandler,
  getBookmarksHandler,
  searchUserHandler,
};

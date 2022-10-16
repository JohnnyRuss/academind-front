import { call, put } from 'redux-saga/effects';

import {
  setUserProfile,
  setSearchResult,
  resetLoadingState,
  resetNestedLoadingState,
} from '../../reducers/userReducer';
import { setPosts, setBookmarkedPosts } from '../../reducers/postsDataReducer';

import { setUserAboutData } from '../../reducers/aboutReducer';

import {
  setNotifications,
  setDeletedNotification,
  setMarkedNotification,
  resetLoadingState as resetActiveUserLoadingState,
} from '../../reducers/activeUserReducer';

import {
  queryUserProfile,
  queryUserProfilePosts,
  queryUserFeed,
  queryBookmarks,
  queryUserSearch,
  queryUserAboutData,
  queryUserNotifications,
  queryDeleteUserNotification,
  queryMarkNotificationAsRead,
  queryGetPendingPosts,
  queryGetHiddenPosts,
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

function* getProfilePostsHandler({ payload: { id: userID, page, limit, hasMore } }) {
  try {
    const { data } = yield call(queryUserProfilePosts, userID, page, limit, hasMore);
    yield put(setPosts({ data: data.data, results: data.results }));
  } catch (error) {
    showError(error, 'getProfilePostsHandler');
  }
}

function* getUserFeedHandler({ payload: { id: userID, page, limit, hasMore } }) {
  try {
    const { data } = yield call(queryUserFeed, userID, page, limit, hasMore);
    yield put(setPosts({ data: data.data, results: data.results }));
    yield put(resetLoadingState());
  } catch (error) {
    showError(error, 'getUserFeedHandler');
  }
}

function* getBookmarksHandler({ payload: { id: userID, page, limit, hasMore } }) {
  try {
    const { data } = yield call(queryBookmarks, userID, page, limit, hasMore);
    yield put(setBookmarkedPosts({ data: data.data, results: data.results }));
    yield put(resetNestedLoadingState());
  } catch (error) {
    showError(error, 'getBookmarksHandler');
  }
}

function* getUserAboutDataHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserAboutData, userId);
    yield put(setUserAboutData(data));
  } catch (error) {
    showError(error, 'getUserAboutDataHandler');
  }
}

function* getUserNotificationsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserNotifications, userId);
    yield put(setNotifications(data));
  } catch (error) {
    showError(error, 'getUserAboutDataHandler');
  }
}

function* deleteUserNotificationHandler({ payload: notifyId }) {
  try {
    yield call(queryDeleteUserNotification, notifyId);
    yield put(setDeletedNotification(notifyId));
  } catch (error) {
    showError(error, 'getUserAboutDataHandler');
  }
}

function* markNotificationAsReadHandler({ payload: notifyId }) {
  try {
    const { data } = yield call(queryMarkNotificationAsRead, notifyId);
    yield put(setMarkedNotification(data));
  } catch (error) {
    showError(error, 'getUserAboutDataHandler');
  }
}

function* getPendingPostsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetPendingPosts, userId);
    yield put(setPosts({ data }));
    yield put(resetActiveUserLoadingState());
  } catch (error) {
    showError(error, 'getPendingPostsHandler');
  }
}

function* getHiddenPostsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetHiddenPosts, userId);
    yield put(setPosts({ data }));
    yield put(resetActiveUserLoadingState());
  } catch (error) {
    showError(error, 'getHiddenPostsHandler');
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
  getUserAboutDataHandler,
  getUserNotificationsHandler,
  deleteUserNotificationHandler,
  markNotificationAsReadHandler,
  getPendingPostsHandler,
  getHiddenPostsHandler,
};

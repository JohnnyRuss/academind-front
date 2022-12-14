import { takeLatest } from 'redux-saga/effects';

import {
  searchUser,
  getUserProfile,
  getProfilePosts,
  getFeedPosts,
  getBookmarks,
} from '../../reducers/userReducer';

import { getUserAboutData } from '../../reducers/aboutReducer';

import {
  getNotifications,
  deleteNotification,
  deleteAllNotification,
  markNotificationAsRead,
  markAllNotificationAsRead,
  getPendingPosts,
  getHiddenPosts,
} from '../../reducers/activeUserReducer';

import {
  searchUserHandler,
  getUserProfileHandler,
  getProfilePostsHandler,
  getBookmarksHandler,
  getUserFeedHandler,
  getUserAboutDataHandler,
  getUserNotificationsHandler,
  deleteUserNotificationHandler,
  deleteAllUserNotificationHandler,
  markNotificationAsReadHandler,
  markAllNotificationAsReadHandler,
  getPendingPostsHandler,
  getHiddenPostsHandler,
} from '../handlers/userHandlers';

function* userSaga() {
  yield takeLatest(getUserProfile, getUserProfileHandler);
  yield takeLatest(searchUser, searchUserHandler);
  yield takeLatest(getProfilePosts, getProfilePostsHandler);
  yield takeLatest(getBookmarks, getBookmarksHandler);
  yield takeLatest(getFeedPosts, getUserFeedHandler);
  yield takeLatest(getUserAboutData, getUserAboutDataHandler);
  yield takeLatest(getNotifications, getUserNotificationsHandler);
  yield takeLatest(deleteNotification, deleteUserNotificationHandler);
  yield takeLatest(deleteAllNotification, deleteAllUserNotificationHandler);
  yield takeLatest(markNotificationAsRead, markNotificationAsReadHandler);
  yield takeLatest(markAllNotificationAsRead, markAllNotificationAsReadHandler);
  yield takeLatest(getPendingPosts, getPendingPostsHandler);
  yield takeLatest(getHiddenPosts, getHiddenPostsHandler);
}

export default userSaga;

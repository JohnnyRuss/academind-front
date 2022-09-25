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
  searchUserHandler,
  getUserProfileHandler,
  getProfilePostsHandler,
  getBookmarksHandler,
  getUserFeedHandler,
  getUserAboutDataHandler,
} from '../handlers/userHandlers';

function* userSaga() {
  yield takeLatest(searchUser, searchUserHandler);
  yield takeLatest(getUserProfile, getUserProfileHandler);
  yield takeLatest(getProfilePosts, getProfilePostsHandler);
  yield takeLatest(getBookmarks, getBookmarksHandler);
  yield takeLatest(getFeedPosts, getUserFeedHandler);
  yield takeLatest(getUserAboutData, getUserAboutDataHandler);
}

export default userSaga;

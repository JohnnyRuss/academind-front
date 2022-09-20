import { takeLatest } from 'redux-saga/effects';

import {
  searchUser,
  getUserProfile,
  getProfilePosts,
  getFeedPosts,
  getBookmarks,
} from '../../reducers/userReducer';

import {
  searchUserHandler,
  getUserProfileHandler,
  getProfilePostsHandler,
  getBookmarksHandler,
  getUserFeedHandler,
} from '../handlers/userHandlers';

function* userSaga() {
  yield takeLatest(searchUser, searchUserHandler);
  yield takeLatest(getUserProfile, getUserProfileHandler);
  yield takeLatest(getProfilePosts, getProfilePostsHandler);
  yield takeLatest(getBookmarks, getBookmarksHandler);
  yield takeLatest(getFeedPosts, getUserFeedHandler);
}

export default userSaga;

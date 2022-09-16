import { takeLatest } from 'redux-saga/effects';

import {
  searchUser,
  getUserProfile,
  getProfilePosts,
  getFeedPosts,
} from '../../reducers/userReducer';

import {
  searchUserHandler,
  getUserProfileHandler,
  getProfilePostsHandler,
  getUserFeedHandler,
} from '../handlers/userHandlers';

function* userSaga() {
  yield takeLatest(searchUser, searchUserHandler);
  yield takeLatest(getUserProfile, getUserProfileHandler);
  yield takeLatest(getProfilePosts, getProfilePostsHandler);
  yield takeLatest(getFeedPosts, getUserFeedHandler);
}

export default userSaga;

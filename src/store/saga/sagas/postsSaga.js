import { takeLatest } from 'redux-saga/effects';

import { getProfilePosts, reactOnPost } from '../../reducers/postsDataReducer';

import { getProfilePostsHandler, reactOnPostHandler } from '../handlers/postsHandlers';

function* postsSaga() {
  yield takeLatest(getProfilePosts, getProfilePostsHandler);
  yield takeLatest(reactOnPost, reactOnPostHandler);
}

export default postsSaga;

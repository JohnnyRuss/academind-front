import { takeLatest } from 'redux-saga/effects';

import { reactOnPost } from '../../reducers/postsDataReducer';

import { createPost } from '../../reducers/createPostReducer';

import { reactOnPostHandler, createPostHandler } from '../handlers/postsHandlers';

function* postsSaga() {
  yield takeLatest(createPost, createPostHandler);
  yield takeLatest(reactOnPost, reactOnPostHandler);
}

export default postsSaga;

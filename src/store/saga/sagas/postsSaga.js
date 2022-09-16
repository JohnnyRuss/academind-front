import { takeLatest } from 'redux-saga/effects';

import { deletePost, reactOnPost } from '../../reducers/postsDataReducer';

import { createPost } from '../../reducers/createPostReducer';
import { updatePost } from '../../reducers/portalReducer';

import {
  createPostHandler,
  deletePostHandler,
  updatePostHandler,
  reactOnPostHandler,
} from '../handlers/postsHandlers';

function* postsSaga() {
  yield takeLatest(createPost, createPostHandler);
  yield takeLatest(deletePost, deletePostHandler);
  yield takeLatest(updatePost, updatePostHandler);
  yield takeLatest(reactOnPost, reactOnPostHandler);
}

export default postsSaga;

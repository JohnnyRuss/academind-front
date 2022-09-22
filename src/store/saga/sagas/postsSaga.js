import { takeLatest } from 'redux-saga/effects';

import { createPost } from '../../reducers/createPostReducer';
import { updatePost, sharePost } from '../../reducers/portalReducer';
import { deletePost, reactOnPost, savePost } from '../../reducers/postsDataReducer';

import {
  createPostHandler,
  deletePostHandler,
  updatePostHandler,
  reactOnPostHandler,
  sharePostHandler,
  savePostHandler,
} from '../handlers/postsHandlers';

function* postsSaga() {
  yield takeLatest(createPost, createPostHandler);
  yield takeLatest(deletePost, deletePostHandler);
  yield takeLatest(updatePost, updatePostHandler);
  yield takeLatest(reactOnPost, reactOnPostHandler);
  yield takeLatest(sharePost, sharePostHandler);
  yield takeLatest(savePost, savePostHandler);
}

export default postsSaga;

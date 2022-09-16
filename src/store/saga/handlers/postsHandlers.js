import { call, put } from 'redux-saga/effects';

import {
  setNewPost,
  setDeletedPost,
  setUpdatedPost,
  setPostReaction,
} from '../../reducers/postsDataReducer';

import { resetCreatePost } from '../../reducers/createPostReducer';
import { resetUpdatePostModal } from '../../reducers/portalReducer';

import {
  queryCreatePost,
  queryDeletePost,
  queryUpdatePost,
  queryPostReaction,
} from '../api/postQueries';

function* createPostHandler({ payload: body }) {
  try {
    const { data } = yield call(queryCreatePost, body);
    yield put(setNewPost(data));
    yield put(resetCreatePost());
  } catch (error) {
    showError(error, 'createPostHandler');
  }
}

function* deletePostHandler({ payload: postId }) {
  try {
    yield call(queryDeletePost, postId);
    yield put(setDeletedPost(postId));
  } catch (error) {
    showError(error, 'deletePostHandler');
  }
}

function* updatePostHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryUpdatePost, { postId: params.postId, body });
    yield put(setUpdatedPost({ params, data }));
    yield put(resetUpdatePostModal());
  } catch (error) {
    showError(error, 'updatePostHandler');
  }
}

function* reactOnPostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(queryPostReaction, { postId, body });
    yield put(setPostReaction({ postId, data }));
  } catch (error) {
    showError(error, 'getUserProfileHandler');
  }
}

function showError(error, location) {
  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error.message,
    err: error,
    stack: error.stack,
  });
}

export { createPostHandler, deletePostHandler, updatePostHandler, reactOnPostHandler };

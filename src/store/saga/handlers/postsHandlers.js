import { call, put } from 'redux-saga/effects';

import { setPostReaction, setPosts, setNewPost } from '../../reducers/postsDataReducer';

import { resetCreatePost } from '../../reducers/createPostReducer';

import { queryPostReaction, queryCreatePost } from '../api/postQueries';

function* createPostHandler({ payload: body }) {
  try {
    const { data } = yield call(queryCreatePost, body);
    yield put(setNewPost(data));
    yield put(resetCreatePost());
  } catch (error) {
    showError(error, 'createPostHandler');
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

export { createPostHandler, reactOnPostHandler };

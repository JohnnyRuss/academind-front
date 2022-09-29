import { call, put, select } from 'redux-saga/effects';

import {
  setPosts,
  setNewPost,
  setDeletedPost,
  setUpdatedPost,
  setPostReaction,
} from '../../reducers/postsDataReducer';

import { resetCreatePost } from '../../reducers/createPostReducer';
import { resetUpdatePostModal, resetSharePostModal } from '../../reducers/portalReducer';

import {
  queryCreatePost,
  queryDeletePost,
  queryUpdatePost,
  queryPostReaction,
  querySharePost,
  querySavePost,
  queryBlogPosts,
  queryGetPost,
} from '../api/postQueries';

import { allowNewPostSet } from '../../../utils/window-location';

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
    showError(error, 'reactOnPostHandler');
  }
}

function* sharePostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(querySharePost, { postId, body });

    const activeUserId = yield select(({ activeUser }) => activeUser.user._id);
    if (allowNewPostSet(activeUserId)) yield put(setNewPost(data));

    yield put(resetSharePostModal());
  } catch (error) {
    showError(error, 'sharePostHandler');
  }
}

function* savePostHandler({ payload: postId }) {
  try {
    yield call(querySavePost, postId);
  } catch (error) {
    showError(error, 'savePostHandler');
  }
}

function* getBlogPostsHandler() {
  try {
    const { data } = yield call(queryBlogPosts);
    yield put(setPosts(data));
  } catch (error) {
    showError(error, 'getBlogPostsHandler');
  }
}

function* getPostHandler({ payload: postId }) {
  try {
    const { data } = yield call(queryGetPost, postId);
    yield put(setNewPost(data));
  } catch (error) {
    showError(error, 'getPostHandler');
  }
}

function showError(error, location) {
  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error?.response?.data?.message || error.message,
    err: error,
    stack: error.stack,
  });
}

export {
  createPostHandler,
  deletePostHandler,
  updatePostHandler,
  reactOnPostHandler,
  sharePostHandler,
  savePostHandler,
  getBlogPostsHandler,
  getPostHandler,
};

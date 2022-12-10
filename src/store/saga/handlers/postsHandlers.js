import { call, put, select } from 'redux-saga/effects';

import {
  setPosts,
  setNewPost,
  setSinglePost,
  setDeletedPost,
  setUpdatedPost,
  setUpdatedPostAudience,
  setPostReaction,
  setTopRatedBlogPosts,
  setTopRatedPublishers,
  setRelatedPosts,
  setShowOnProfile,
  setHiddenPost,
  setRemovedTag,
  setErrorOnLoadingState,
} from '../../reducers/postsDataReducer';

import { resetCreatePost } from '../../reducers/createPostReducer';
import { resetUpdateState, resetSharePostModal } from '../../reducers/portalReducer';

import {
  queryCreatePost,
  queryDeletePost,
  queryUpdatePost,
  queryChangePostAudience,
  queryPostReaction,
  querySharePost,
  querySavePost,
  queryBlogPosts,
  queryGetPost,
  queryTopRatedBlogPosts,
  queryRelatedPosts,
  queryTopRatedPublishers,
  queryShowPostOnProfile,
  queryAddPostToProfile,
  queryHidePostFromProfile,
  queryRemoveTagOnPost,
} from '../api/postQueries';

import { allowNewPostSet, isRoute } from '../../../lib/window-location';

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
    yield put(resetUpdateState());
  } catch (error) {
    showError(error, 'updatePostHandler');
  }
}

function* changePostAudienceHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryChangePostAudience, { postId: params.postId, body });
    yield put(setUpdatedPostAudience({ params, data }));
  } catch (error) {
    showError(error, 'changePostAudienceHandler');
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

function* getBlogPostsHandler({ payload: { page, limit, hasMore, query } }) {
  try {
    const { data } = yield call(queryBlogPosts, page, limit, hasMore, query);
    yield put(setPosts({ data: data.data, results: data.results }));
  } catch (error) {
    showError(error, 'getBlogPostsHandler');
  }
}

function* getTopRatedPublishersHandler({ payload: limit }) {
  try {
    const { data } = yield call(queryTopRatedPublishers, limit);
    yield put(setTopRatedPublishers(data));
  } catch (error) {
    showError(error, 'getTopRatedPublishersHandler');
  }
}

function* getTopRatedBlogPostsHandler({ payload: limit }) {
  try {
    const { data } = yield call(queryTopRatedBlogPosts, limit);
    yield put(setTopRatedBlogPosts(data));
  } catch (error) {
    showError(error, 'getTopRatedBlogPostsHandler');
  }
}

function* getPostHandler({ payload: postId }) {
  try {
    const { data } = yield call(queryGetPost, postId);
    yield put(setSinglePost(data));
  } catch (error) {
    yield put(setErrorOnLoadingState(error?.response?.data?.message || error.message));
    // showError(error, 'getPostHandler');
  }
}

function* getRelatedPostsHandler({ payload: { postId, limit } }) {
  try {
    const { data } = yield call(queryRelatedPosts, postId, limit);
    yield put(setRelatedPosts(data));
  } catch (error) {
    showError(error, 'getPostHandler');
  }
}

function* showPostOnProfileHandler({ payload: { postId, body } }) {
  try {
    yield call(queryShowPostOnProfile, postId, body);
    yield put(setShowOnProfile(postId));
  } catch (error) {
    showError(error, 'showPostOnProfileHandler');
  }
}

function* addPostToProfileHandler({ payload: postId }) {
  try {
    yield call(queryAddPostToProfile, postId);
    yield put(setShowOnProfile(postId));
  } catch (error) {
    showError(error, 'addPostToProfileHandler');
  }
}

function* hidePostFromProfileHandler({ payload: postId }) {
  try {
    const excludeIf = isRoute('posts') || isRoute('tags') || isRoute('hidden');
    yield call(queryHidePostFromProfile, postId);
    if (excludeIf) yield put(setHiddenPost(postId));
  } catch (error) {
    showError(error, 'hidePostFromProfileHandler');
  }
}

function* removeTagOnPostHandler({ payload: postId }) {
  try {
    const excludeIf = isRoute('posts') || isRoute('tags') || isRoute('hidden');
    const { data } = yield call(queryRemoveTagOnPost, postId);
    yield put(setRemovedTag({ data, remove: excludeIf ? true : false }));
  } catch (error) {
    showError(error, 'removeTagOnPostHandler');
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
  changePostAudienceHandler,
  reactOnPostHandler,
  sharePostHandler,
  savePostHandler,
  getBlogPostsHandler,
  getPostHandler,
  getTopRatedPublishersHandler,
  getTopRatedBlogPostsHandler,
  getRelatedPostsHandler,
  showPostOnProfileHandler,
  addPostToProfileHandler,
  hidePostFromProfileHandler,
  removeTagOnPostHandler,
};

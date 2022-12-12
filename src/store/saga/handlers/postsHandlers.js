import { call, put, select } from "redux-saga/effects";
import { showError } from "./errorHandler";

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
} from "../../reducers/postsDataReducer";

import { resetCreatePost } from "../../reducers/createPostReducer";
import {
  resetUpdateState,
  resetSharePostModal,
} from "../../reducers/portalReducer";

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
} from "../api/postQueries";

import { allowNewPostSet, isRoute } from "../../../lib/window-location";

export function* createPostHandler({ payload: body }) {
  try {
    const { data } = yield call(queryCreatePost, body);
    yield put(setNewPost(data));
    yield put(resetCreatePost());
  } catch (error) {
    showError(error, "createPostHandler");
  }
}

export function* deletePostHandler({ payload: postId }) {
  try {
    yield call(queryDeletePost, postId);
    yield put(setDeletedPost(postId));
  } catch (error) {
    showError(error, "deletePostHandler");
  }
}

export function* updatePostHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryUpdatePost, {
      postId: params.postId,
      body,
    });
    yield put(setUpdatedPost({ params, data }));
    yield put(resetUpdateState());
  } catch (error) {
    showError(error, "updatePostHandler");
  }
}

export function* changePostAudienceHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryChangePostAudience, {
      postId: params.postId,
      body,
    });
    yield put(setUpdatedPostAudience({ params, data }));
  } catch (error) {
    showError(error, "changePostAudienceHandler");
  }
}

export function* reactOnPostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(queryPostReaction, { postId, body });
    yield put(setPostReaction({ postId, data }));
  } catch (error) {
    showError(error, "reactOnPostHandler");
  }
}

export function* sharePostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(querySharePost, { postId, body });

    const activeUserId = yield select(({ activeUser }) => activeUser.user._id);
    if (allowNewPostSet(activeUserId)) yield put(setNewPost(data));

    yield put(resetSharePostModal());
  } catch (error) {
    showError(error, "sharePostHandler");
  }
}

export function* savePostHandler({ payload: postId }) {
  try {
    yield call(querySavePost, postId);
  } catch (error) {
    showError(error, "savePostHandler");
  }
}

export function* getBlogPostsHandler({
  payload: { page, limit, hasMore, query },
}) {
  try {
    const { data } = yield call(queryBlogPosts, page, limit, hasMore, query);
    yield put(setPosts({ data: data.data, results: data.results }));
  } catch (error) {
    showError(error, "getBlogPostsHandler");
  }
}

export function* getTopRatedPublishersHandler({ payload: limit }) {
  try {
    const { data } = yield call(queryTopRatedPublishers, limit);
    yield put(setTopRatedPublishers(data));
  } catch (error) {
    showError(error, "getTopRatedPublishersHandler");
  }
}

export function* getTopRatedBlogPostsHandler({ payload: limit }) {
  try {
    const { data } = yield call(queryTopRatedBlogPosts, limit);
    yield put(setTopRatedBlogPosts(data));
  } catch (error) {
    showError(error, "getTopRatedBlogPostsHandler");
  }
}

export function* getPostHandler({ payload: postId }) {
  try {
    const { data } = yield call(queryGetPost, postId);
    yield put(setSinglePost(data));
  } catch (error) {
    yield put(
      setErrorOnLoadingState(error?.response?.data?.message || error.message)
    );
    // showError(error, 'getPostHandler');
  }
}

export function* getRelatedPostsHandler({ payload: { postId, limit } }) {
  try {
    const { data } = yield call(queryRelatedPosts, postId, limit);
    yield put(setRelatedPosts(data));
  } catch (error) {
    showError(error, "getPostHandler");
  }
}

export function* showPostOnProfileHandler({ payload: { postId, body } }) {
  try {
    yield call(queryShowPostOnProfile, postId, body);
    yield put(setShowOnProfile(postId));
  } catch (error) {
    showError(error, "showPostOnProfileHandler");
  }
}

export function* addPostToProfileHandler({ payload: postId }) {
  try {
    yield call(queryAddPostToProfile, postId);
    yield put(setShowOnProfile(postId));
  } catch (error) {
    showError(error, "addPostToProfileHandler");
  }
}

export function* hidePostFromProfileHandler({ payload: postId }) {
  try {
    const excludeIf = isRoute("posts") || isRoute("tags") || isRoute("hidden");
    yield call(queryHidePostFromProfile, postId);
    if (excludeIf) yield put(setHiddenPost(postId));
  } catch (error) {
    showError(error, "hidePostFromProfileHandler");
  }
}

export function* removeTagOnPostHandler({ payload: postId }) {
  try {
    const excludeIf = isRoute("posts") || isRoute("tags") || isRoute("hidden");
    const { data } = yield call(queryRemoveTagOnPost, postId);
    yield put(setRemovedTag({ data, remove: excludeIf ? true : false }));
  } catch (error) {
    showError(error, "removeTagOnPostHandler");
  }
}

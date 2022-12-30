import { call, put, select } from "redux-saga/effects";
import { showError, errorMessages, triggerError } from "./errorHandler";

import {
  setErrorOnPosts,
  setPosts,
  setNewPost,
  setSinglePost,
  setDeletedPost,
  setUpdatedPost,
  setUpdatedPostAudience,
  setPostReaction,
  setHiddenPost,
  setRemovedTag,
  // BlogPosts
  setErrorOnTopRatedBlogPosts,
  setErrorOnTopRatedPublishers,
  setErrorOnRelatedBlogPosts,
  setTopRatedBlogPosts,
  setTopRatedPublishers,
  setRelatedPosts,
  setShowOnProfile,
} from "../../reducers/postsDataReducer";

import {
  resetCreatePost,
  setCreatePostError,
} from "../../reducers/createPostReducer";

import {
  resetSharePostModal,
  setSharePostError,
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
    yield showError({
      error,
      location: "createPostHandler",
      setter: setCreatePostError,
      setterParams: {
        message: errorMessages.post.create,
      },
    });
  }
}

export function* updatePostHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryUpdatePost, {
      postId: params.postId,
      body,
    });
    yield put(setUpdatedPost({ params, data }));
    yield put(resetCreatePost());
  } catch (error) {
    yield showError({
      error,
      location: "updatePostHandler",
      setter: setCreatePostError,
      setterParams: {
        message: errorMessages.post.updatePost,
      },
    });
  }
}

export function* deletePostHandler({ payload: postId }) {
  try {
    yield call(queryDeletePost, postId);
    yield put(setDeletedPost(postId));
  } catch (error) {
    yield showError({
      error,
      location: "deletePostHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.deletion,
        task: "deletion",
      },
    });
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
    yield showError({
      error,
      location: "changePostAudienceHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.audience,
        task: "audience",
      },
    });
  }
}

export function* reactOnPostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(queryPostReaction, { postId, body });
    yield put(setPostReaction({ postId, data }));
  } catch (error) {
    yield showError({ error, location: "reactOnPostHandler" });
  }
}

export function* sharePostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(querySharePost, { postId, body });

    const activeUserId = yield select(({ activeUser }) => activeUser.user._id);
    if (allowNewPostSet(activeUserId)) yield put(setNewPost(data));

    yield put(resetSharePostModal());
  } catch (error) {
    yield showError({
      error,
      location: "sharePostHandler",
      setter: setSharePostError,
      setterParams: {
        message: errorMessages.post.sharePost,
      },
    });
  }
}

export function* savePostHandler({ payload: postId }) {
  try {
    yield call(querySavePost, postId);
  } catch (error) {
    yield showError({
      error,
      location: "savePostHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.save,
        task: "save",
      },
    });
  }
}

export function* getBlogPostsHandler({
  payload: { page, limit, hasMore, query },
}) {
  try {
    const { data } = yield call(queryBlogPosts, page, limit, hasMore, query);
    yield put(setPosts({ data: data.data, results: data.results }));
  } catch (error) {
    yield showError({
      error,
      location: "getBlogPostsHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.load,
        task: "get",
      },
    });
  }
}

export function* getTopRatedPublishersHandler({ payload: limit }) {
  try {
    const { data } = yield call(queryTopRatedPublishers, limit);
    yield put(setTopRatedPublishers(data));
  } catch (error) {
    yield showError({
      error,
      location: "getTopRatedPublishersHandler",
      setter: setErrorOnTopRatedPublishers,
      setterParams: {
        message: errorMessages.post.load,
      },
    });
  }
}

export function* getTopRatedBlogPostsHandler({ payload: limit }) {
  try {
    const { data } = yield call(queryTopRatedBlogPosts, limit);
    yield put(setTopRatedBlogPosts(data));
  } catch (error) {
    yield showError({
      error,
      location: "getTopRatedBlogPostsHandler",
      setter: setErrorOnTopRatedBlogPosts,
      setterParams: { message: errorMessages.post.load },
    });
  }
}

export function* getPostHandler({ payload: postId }) {
  try {
    const { data } = yield call(queryGetPost, postId);
    yield put(setSinglePost(data));
  } catch (error) {
    yield put(setErrorOnPosts(error?.response?.data?.message || error.message));
    yield showError({
      error,
      location: "getPostHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.load,
        task: "get",
      },
    });
  }
}

export function* getRelatedPostsHandler({ payload: { postId, limit } }) {
  try {
    const { data } = yield call(queryRelatedPosts, postId, limit);
    yield put(setRelatedPosts(data));
  } catch (error) {
    yield showError({
      error,
      location: "getPostHandler",
      setter: setErrorOnRelatedBlogPosts,
      setterParams: {
        message: errorMessages.post.load,
      },
    });
  }
}

export function* showPostOnProfileHandler({ payload: { postId, body } }) {
  try {
    yield call(queryShowPostOnProfile, postId, body);
    yield put(setShowOnProfile(postId));
  } catch (error) {
    yield showError({
      error,
      location: "showPostOnProfileHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.operation,
        task: "showOnProfile",
      },
    });
  }
}

export function* addPostToProfileHandler({ payload: postId }) {
  try {
    yield call(queryAddPostToProfile, postId);
    yield put(setShowOnProfile(postId));
  } catch (error) {
    yield showError({
      error,
      location: "addPostToProfileHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.addToProfile,
        task: "addToProfile",
      },
    });
  }
}

export function* hidePostFromProfileHandler({ payload: postId }) {
  try {
    const excludeIf = isRoute("posts") || isRoute("tags") || isRoute("hidden");
    yield call(queryHidePostFromProfile, postId);
    if (excludeIf) yield put(setHiddenPost(postId));
  } catch (error) {
    yield showError({
      error,
      location: "hidePostFromProfileHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.hide,
        task: "hide",
      },
    });
  }
}

export function* removeTagOnPostHandler({ payload: postId }) {
  try {
    const excludeIf = isRoute("posts") || isRoute("tags") || isRoute("hidden");
    const { data } = yield call(queryRemoveTagOnPost, postId);
    yield put(setRemovedTag({ data, remove: excludeIf ? true : false }));
  } catch (error) {
    yield showError({
      error,
      location: "removeTagOnPostHandler",
      setter: setErrorOnPosts,
      setterParams: {
        message: errorMessages.post.operation,
        task: "removeTag",
      },
    });
  }
}

import { takeLatest } from "redux-saga/effects";

import { createPost, updatePost } from "../../reducers/createPostReducer";
import { sharePost } from "../../reducers/portalReducer";
import {
  // CRUD'S
  deletePost,
  reactOnPost,
  hideFromProfile,
  removeTag,
  changePostAudience,
  savePost,
  /******************/
  showOnProfile,
  addToProfile,
  getBlogPosts,
  getPost,
  getTopRatedBlogPosts,
  getTopRatedPublishers,
  getRelatedPosts,
} from "../../reducers/postsDataReducer";

import {
  createPostHandler,
  deletePostHandler,
  updatePostHandler,
  changePostAudienceHandler,
  reactOnPostHandler,
  sharePostHandler,
  savePostHandler,
  getBlogPostsHandler,
  getPostHandler,
  getTopRatedBlogPostsHandler,
  getTopRatedPublishersHandler,
  getRelatedPostsHandler,
  showPostOnProfileHandler,
  addPostToProfileHandler,
  hidePostFromProfileHandler,
  removeTagOnPostHandler,
} from "../handlers/postsHandlers";

function* postsSaga() {
  yield takeLatest(createPost, createPostHandler);
  yield takeLatest(deletePost, deletePostHandler);
  yield takeLatest(updatePost, updatePostHandler);
  yield takeLatest(changePostAudience, changePostAudienceHandler);
  yield takeLatest(reactOnPost, reactOnPostHandler);
  yield takeLatest(sharePost, sharePostHandler);
  yield takeLatest(savePost, savePostHandler);
  yield takeLatest(getBlogPosts, getBlogPostsHandler);
  yield takeLatest(getPost, getPostHandler);
  yield takeLatest(getTopRatedBlogPosts, getTopRatedBlogPostsHandler);
  yield takeLatest(getTopRatedPublishers, getTopRatedPublishersHandler);
  yield takeLatest(getRelatedPosts, getRelatedPostsHandler);
  yield takeLatest(showOnProfile, showPostOnProfileHandler);
  yield takeLatest(addToProfile, addPostToProfileHandler);
  yield takeLatest(removeTag, removeTagOnPostHandler);
  yield takeLatest(hideFromProfile, hidePostFromProfileHandler);
}

export default postsSaga;

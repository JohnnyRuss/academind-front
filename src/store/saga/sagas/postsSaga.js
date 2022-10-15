import { takeLatest } from 'redux-saga/effects';

import { createPost } from '../../reducers/createPostReducer';
import { updatePost, sharePost } from '../../reducers/portalReducer';
import {
  deletePost,
  changePostAudience,
  reactOnPost,
  savePost,
  getBlogPosts,
  getPost,
  getTopRatedBlogPosts,
  getTopRatedPublishers,
  getRelatedPosts,
  showOnProfile,
  removeTag,
} from '../../reducers/postsDataReducer';

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
  removeTagOnPostHandler,
} from '../handlers/postsHandlers';

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
  yield takeLatest(removeTag, removeTagOnPostHandler);
}

export default postsSaga;

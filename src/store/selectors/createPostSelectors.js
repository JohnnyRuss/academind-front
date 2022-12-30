import { createSelector } from "@reduxjs/toolkit";

export const selectCreatePostLoadingState = ({ createPost }) =>
  createPost.loadingState;

const selectedCreateBlogPost = ({ createPost }) => ({
  createBlogPostIsOpen: createPost.createBlogPostIsOpen,
  title: createPost.title,
  text: createPost.text,
  tags: createPost.tags,
  labels: createPost.labels,
  category: createPost.category,
  files: createPost.files,
  loadingState: createPost.loadingState,
  audience: createPost.audience,
  blogPostError: createPost.createBlogPostError,
});

export const selectCreateBlogPost = createSelector(
  selectedCreateBlogPost,
  (memorised) => memorised
);

export const selectCreateBlogPostError = ({ createPost }) =>
  createPost.createBlogPostError;

const selectedCreatePost = ({ createPost }) => ({
  createPostIsOpen: createPost.createPostIsOpen,
  activeSelectedMedia: createPost.activeSelectedMedia,
  text: createPost.text,
  tags: createPost.tags,
  files: createPost.files,
  audience: createPost.audience,
  loadingState: createPost.loadingState,
});

export const selectCreatePost = createSelector(
  selectedCreatePost,
  (memorised) => memorised
);

export const selectActiveSelectedMedia = ({ createPost }) =>
  createPost.activeSelectedMedia;

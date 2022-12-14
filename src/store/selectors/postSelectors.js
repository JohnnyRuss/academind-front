import { createSelector } from "@reduxjs/toolkit";

/* ============================================= */
/* ============== Loading States ============== */
/* =========================================== */

export const selectPostsLoadingState = ({ postsData }) =>
  postsData.loadingState;

export const selectTopRatedBlogPostsLoadingState = ({ postsData }) =>
  postsData.topRatedPostsLoadingState;

export const selectTopRatedPublishersLoadingState = ({ postsData }) =>
  postsData.publishersLoadingState;

/* ============================================= */
/* =================== Common ================= */
/* =========================================== */

export const selectedPosts = ({ postsData }) => ({
  posts: postsData.posts,
  hasMore: postsData?.posts.length < postsData.results,
});

export const selectPosts = createSelector(
  selectedPosts,
  (selectedData) => selectedData
);

/* ============================================= */
/* =================== Blog =================== */
/* =========================================== */

export const selectPostOnZero = ({ postsData }) => postsData.posts?.[0];

export const selectRelatedPosts = ({ postsData }) => postsData.relatedPosts;

export const selectTopRatedBlogPosts = ({ postsData }) =>
  postsData.topRatedBlogPosts;

export const selectTopRatedPublishers = ({ postsData }) =>
  postsData.topRatedPublishers;

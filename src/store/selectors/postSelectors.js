import { createSelector } from '@reduxjs/toolkit';

export const selectedPosts = ({ postsData }) => ({
  posts: postsData.posts,
  hasMore: postsData?.posts.length < postsData.results,
});

export const selectPosts = createSelector(selectedPosts, (selectedData) => selectedData);

export const postCommentsById = ({ commentsData }, ID) =>
  commentsData.comments.find((commentsBlock) => commentsBlock.postId === ID)?.comments;

export const selectPostCommentsById = createSelector(
  postCommentsById,
  (selectedData) => selectedData
);

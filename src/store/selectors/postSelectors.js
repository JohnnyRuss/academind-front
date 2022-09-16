import { createSelector } from '@reduxjs/toolkit';

export const profilePosts = ({ postsData }) => postsData.posts;

export const selectPosts = createSelector(profilePosts, (selectedData) => selectedData);

export const postCommentsById = ({ commentsData }, ID) =>
  commentsData.comments.find((commentsBlock) => commentsBlock.postId === ID)?.comments;

export const selectPostCommentsById = createSelector(
  postCommentsById,
  (selectedData) => selectedData
);

import { createSelector } from '@reduxjs/toolkit';

export const profilePosts = ({ postsData }) => postsData.posts;

export const selectPosts = createSelector(profilePosts, (selectedData) => selectedData);

export const postCommentsById = ({ commentsData }, ID) =>
  commentsData.comments.find((commentsBlock) => commentsBlock.postId === ID)?.comments;

export const selectPostCommentsById = createSelector(
  postCommentsById,
  (selectedData) => selectedData
);

// export const selectPostAuthorById = ({ postsData }, id) => {
//   const post = postsData.posts.find((post) => post._id === id);
//   return { authorId: post.author._id };
// };

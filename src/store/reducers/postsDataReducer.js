import { createSlice } from '@reduxjs/toolkit';

const postsDataSlice = createSlice({
  name: 'PostsData',
  initialState: {
    posts: [],
  },
  reducers: {
    getProfilePosts() {},

    setProfilePosts(state, { payload }) {
      state.posts = [...payload];
    },

    reactOnPost() {},

    setPostReaction(state, { payload }) {
      const { postId, data } = payload;

      const post = state.posts.find((post) => post._id === postId);
      Object.keys(data).map((key) => (post[key] = data[key]));
    },

    encreasePostCommentCount(state, { payload }) {
      const i = state.posts.findIndex((post) => post._id === payload);
      state.posts[i].commentsAmount += 1;
    },

    decreasePostCommentCount(state, { payload }) {
      const { deletedCommentCount, postId } = payload;

      const i = state.posts.findIndex((post) => post._id === postId);
      deletedCommentCount
        ? (state.posts[i].commentsAmount -= deletedCommentCount + 1)
        : (state.posts[i].commentsAmount -= 1);
    },
  },
});

export const postsDataReducer = postsDataSlice.reducer;
export const {
  getProfilePosts,
  setProfilePosts,
  reactOnPost,
  setPostReaction,
  encreasePostCommentCount,
  decreasePostCommentCount,
} = postsDataSlice.actions;

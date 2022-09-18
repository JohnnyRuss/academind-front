import { createSlice } from '@reduxjs/toolkit';

const postsDataSlice = createSlice({
  name: 'PostsData',
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: '',
    },
    posts: [],
  },
  reducers: {
    setPosts(state, { payload }) {
      state.posts = [...payload];
    },

    setNewPost(state, { payload }) {
      state.posts = [payload, ...state.posts];
    },

    deletePost(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    setDeletedPost(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    setUpdatedPost(state, { payload }) {
      const { params, data } = payload;

      const i = state.posts.findIndex((post) => post._id === params.postId);
      state.posts[i] = { ...state.posts[i], ...data };
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
  setPosts,
  setNewPost,
  deletePost,
  setDeletedPost,
  setUpdatedPost,
  reactOnPost,
  setPostReaction,
  encreasePostCommentCount,
  decreasePostCommentCount,
} = postsDataSlice.actions;

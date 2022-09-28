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

    setActiveUserUpdatedCover(state, { payload }) {
      state.posts.map((post) => {
        post.author.profileImg = payload;
        if (post.authenticAuthor && post.authenticAuthor._id === post.author._id)
          post.authenticAuthor.profileImg = payload;

        return post;
      });
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

    savePost() {},

    removeBookmark(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },

    resetPosts(state) {
      state.posts = [];
    },

    getBlogPosts(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },
  },
});

export const postsDataReducer = postsDataSlice.reducer;
export const {
  setPosts,
  setNewPost,
  setActiveUserUpdatedCover,
  deletePost,
  setDeletedPost,
  setUpdatedPost,
  reactOnPost,
  setPostReaction,
  encreasePostCommentCount,
  decreasePostCommentCount,
  savePost,
  removeBookmark,
  resetPosts,
  getBlogPosts,
} = postsDataSlice.actions;

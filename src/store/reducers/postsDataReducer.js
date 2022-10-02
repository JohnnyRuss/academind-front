import { createSlice } from '@reduxjs/toolkit';
import { updateLoadingState } from './helpers';

const postsDataSlice = createSlice({
  name: 'PostsData',
  initialState: {
    loadingState: { loading: false, error: false, message: '' },
    publishersLoadingState: { loading: false, error: false, message: '' },
    topRatedPostsLoadingState: { loading: false, error: false, message: '' },
    posts: [],
    topRatedBlogPosts: [],
    topRatedPublishers: [],
    results: '',
  },
  reducers: {
    startLoading(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    setPosts(state, { payload }) {
      const { data, results } = payload;
      state.posts = [...state.posts, ...data];
      if (results) state.results = results;
      if (state.loadingState.loading) updateLoadingState(state, 'loadingState', false);
    },

    setNewPost(state, { payload }) {
      state.posts = [payload, ...state.posts];
      updateLoadingState(state, 'loadingState', false);
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
      updateLoadingState(state, 'loadingState', true);
    },

    setDeletedPost(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);
      updateLoadingState(state, 'loadingState', false);
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
      state.results = '';
      if (state.topRatedBlogPosts[0]) state.topRatedBlogPosts = [];
      if (state.topRatedPublishers[0]) state.topRatedPublishers = [];
    },

    getBlogPosts() {},

    getTopRatedPublishers(state) {
      updateLoadingState(state, 'publishersLoadingState', true);
    },

    setTopRatedPublishers(state, { payload }) {
      state.topRatedPublishers = payload;
      updateLoadingState(state, 'publishersLoadingState', false);
    },

    getTopRatedBlogPosts(state) {
      updateLoadingState(state, 'topRatedPostsLoadingState', true);
    },

    setTopRatedBlogPosts(state, { payload }) {
      state.topRatedBlogPosts = payload;
      updateLoadingState(state, 'topRatedPostsLoadingState', false);
    },

    getPost(state) {
      updateLoadingState(state, 'loadingState', true);
    },
  },
});

export const postsDataReducer = postsDataSlice.reducer;
export const {
  startLoading,
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
  getTopRatedBlogPosts,
  setTopRatedBlogPosts,
  getTopRatedPublishers,
  setTopRatedPublishers,
  getPost,
} = postsDataSlice.actions;

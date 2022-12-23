import { createSlice } from "@reduxjs/toolkit";

function updateLoadingState({
  state,
  key,
  loading = true,
  error = false,
  message,
  task,
  hasTask = true,
}) {
  state[key].loading = loading;
  state[key].error = error ? true : false;
  state[key].message = error ? message : "";
  if (hasTask) state[key].task = error ? task : "";
}

const postsDataSlice = createSlice({
  name: "PostsData",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
      task: "", // "get" | "deletion" | "audience" | "save" | "showOnProfile" | "addToProfile" | "hide" | "removeTag" |
    },
    publishersLoadingState: { loading: false, error: false, message: "" },
    topRatedPostsLoadingState: { loading: false, error: false, message: "" },
    relatedPostsLoadingState: { loading: false, error: false, message: "" },
    posts: [],
    topRatedBlogPosts: [],
    topRatedPublishers: [],
    relatedPosts: [],
    results: "",
  },
  reducers: {
    // ============================================ //
    // ======= Error Setters And Reseters ======== //
    // ========================================== //

    setErrorOnPosts(state, { payload }) {
      updateLoadingState({
        state,
        key: "loadingState",
        loading: false,
        error: true,
        message: payload.message,
        task: payload.task,
      });
    },

    setErrorOnTopRatedPublishers(state, { payload }) {
      updateLoadingState({
        state,
        key: "publishersLoadingState",
        loading: false,
        error: true,
        message: payload.message,
        hasTask: false,
      });
    },

    setErrorOnTopRatedBlogPosts(state, { payload }) {
      updateLoadingState({
        state,
        key: "topRatedPostsLoadingState",
        loading: false,
        error: true,
        message: payload.message,
        hasTask: false,
      });
    },

    setErrorOnRelatedBlogPosts(state, { payload }) {
      updateLoadingState({
        state,
        key: "relatedPostsLoadingState",
        loading: false,
        error: true,
        message: payload.message,
        hasTask: false,
      });
    },

    resetErrorOnPost(state) {
      updateLoadingState({
        state,
        key: "loadingState",
        hasTask: true,
        loading: false,
      });
    },

    resetPosts(state) {
      if (state.posts[0]) state.posts = [];
      if (state.topRatedBlogPosts[0]) state.topRatedBlogPosts = [];
      if (state.topRatedPublishers[0]) state.topRatedPublishers = [];
      if (state.relatedPosts[0]) state.relatedPosts = [];
      state.results = "";
    },

    // ================================ //
    // ======= Manual Trigger ======== //
    // ===============================//

    startLoading(state) {
      updateLoadingState({ state, key: "loadingState" });
    },

    // ============================================ //
    // ======= Global Setters And Getters ======== //
    // ===========================================//

    getPost(state) {
      updateLoadingState({ state, key: "loadingState" });
    },

    setPosts(state, { payload }) {
      const { data, results } = payload;
      if (results) {
        state.results = results;
        state.posts = [...data];
      } else if (!results) {
        state.posts = [...state.posts, ...data];
      }

      if (state.loadingState.loading)
        updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setNewPost(state, { payload }) {
      state.posts = [payload, ...state.posts];
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setSinglePost(state, { payload }) {
      state.posts = [payload];
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    // --> trigger is called in portal reducer
    setUpdatedPost(state, { payload }) {
      const { params, data } = payload;

      const i = state.posts.findIndex((post) => post._id === params.postId);
      state.posts[i] = { ...state.posts[i], ...data };
    },

    //trigger is called in comments reducer
    encreasePostCommentCount(state, { payload }) {
      const i = state.posts.findIndex((post) => post._id === payload);
      state.posts[i].commentsAmount += 1;
    },

    //trigger is called in comments reducer
    decreasePostCommentCount(state, { payload }) {
      const { deletedCommentCount, postId } = payload;

      const i = state.posts.findIndex((post) => post._id === postId);
      deletedCommentCount
        ? (state.posts[i].commentsAmount -= deletedCommentCount + 1)
        : (state.posts[i].commentsAmount -= 1);
    },

    setActiveUserUpdatedCover(state, { payload }) {
      state.posts.map((post) => {
        post.author.profileImg = payload;
        if (
          post.authenticAuthor &&
          post.authenticAuthor._id === post.author._id
        )
          post.authenticAuthor.profileImg = payload;

        return post;
      });
    },

    // ============================= //
    // ======= Post CRUD'S ======== //
    // =========================== //

    changePostAudience() {},

    setUpdatedPostAudience(state, { payload }) {
      const { params, data } = payload;

      const i = state.posts.findIndex((post) => post._id === params.postId);
      state.posts[i].audience = data.audience;
    },

    deletePost(state) {
      updateLoadingState({ state, key: "loadingState" });
      state.results = state.results - 1;
    },

    setDeletedPost(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);

      if (state.results) state.results = state.results -= 1;

      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    reactOnPost() {},

    setPostReaction(state, { payload }) {
      const { postId, data } = payload;

      const post = state.posts.find((post) => post._id === postId);
      Object.keys(data).map((key) => (post[key] = data[key]));
    },

    // =========================== //
    // ======= Bookmarks ======== //
    // ========================= //

    savePost() {},

    removeBookmark(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);
      state.results = state.results - 1;
    },

    setBookmarkedPosts(state, { payload }) {
      const { data, results } = payload;

      state.posts = [
        ...state.posts,
        ...data.map((bookmark) => {
          if (bookmark.deleted)
            return { _id: bookmark.cachedId, deleted: bookmark.deleted };
          else return bookmark.post;
        }),
      ];

      if (results) state.results = results;
    },

    // ================================ //
    // ======= Profile-Review ======== //
    // ============================== //

    // --> used in profileReview on Tagged Posts
    showOnProfile() {},

    // --> used in profileReview on Hidden Posts
    addToProfile() {},

    setShowOnProfile(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },

    hideFromProfile() {},

    setHiddenPost(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);

      if (state.results) state.results = state.results -= 1;
    },

    removeTag() {},

    setRemovedTag(state, { payload }) {
      const { data, remove } = payload;

      if (remove) {
        state.posts = state.posts.filter((post) => post._id !== data.postId);
        state.results = state.results -= 1;
      } else if (!remove) {
        const i = state.posts.findIndex((post) => post._id === data.postId);
        state.posts[i].tags = data.tags;
      }
    },

    // =========================== //
    // ======= BlogPosts ======== //
    // ========================= //

    getBlogPosts() {},

    getTopRatedPublishers(state) {
      updateLoadingState({
        state,
        key: "publishersLoadingState",
        hasTask: false,
      });
    },

    setTopRatedPublishers(state, { payload }) {
      state.topRatedPublishers = payload;
      updateLoadingState({
        state,
        key: "publishersLoadingState",
        loading: false,
        hasTask: false,
      });
    },

    getTopRatedBlogPosts(state) {
      updateLoadingState({
        state,
        key: "topRatedPostsLoadingState",
        hasTask: false,
      });
    },

    setTopRatedBlogPosts(state, { payload }) {
      state.topRatedBlogPosts = payload;
      updateLoadingState({
        state,
        key: "topRatedPostsLoadingState",
        loading: false,
        hasTask: false,
      });
    },

    getRelatedPosts(state) {
      updateLoadingState({
        state,
        key: "relatedPostsLoadingState",
        hasTask: false,
      });
    },

    setRelatedPosts(state, { payload }) {
      state.relatedPosts = payload;
      updateLoadingState({
        state,
        key: "relatedPostsLoadingState",
        loading: false,
        hasTask: false,
      });
    },
  },
});

export const postsDataReducer = postsDataSlice.reducer;
export const {
  setErrorOnPosts,
  resetErrorOnPost,
  setErrorOnTopRatedBlogPosts,
  setErrorOnTopRatedPublishers,
  setErrorOnRelatedBlogPosts,
  startLoading,
  setPosts,
  setBookmarkedPosts,
  setNewPost,
  setActiveUserUpdatedCover,
  deletePost,
  setDeletedPost,
  setUpdatedPost,
  changePostAudience,
  setUpdatedPostAudience,
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
  getRelatedPosts,
  setRelatedPosts,
  getPost,
  setSinglePost,
  showOnProfile,
  addToProfile,
  setShowOnProfile,
  hideFromProfile,
  setHiddenPost,
  removeTag,
  setRemovedTag,
} = postsDataSlice.actions;

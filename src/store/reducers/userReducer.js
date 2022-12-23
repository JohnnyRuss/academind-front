import { createSlice } from "@reduxjs/toolkit";

function updateLoadingState({
  state,
  key,
  loading = true,
  error = false,
  message,
}) {
  state[key].loading = loading;
  state[key].error = error ? true : false;
  state[key].message = error ? message : "";
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    // For Top Level like Feed And Profile
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    // For nested routes like profile/bookmark or profile/about
    nestedLoadingState: {
      loading: false,
      error: false,
      message: "",
    },
    searchLoadingState: {
      loading: false,
      error: false,
      message: "",
    },
    user: {},
    searchResult: [],
  },

  reducers: {
    // ====================================== //
    // ========== Manual Triggers ========== //
    // ==================================== //
    // manual triggers are used because getBookmarks,getFeedPosts and etc. are trigered in this reducer but are seted in to the postsDataReducer. so in the case to controll loadingState we are useing manual trigers.

    // used by: getFeedPostsQuery;
    startLoading(state) {
      updateLoadingState({ state, key: "loadingState" });
    },

    resetLoadingState(state) {
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setUserError(state, { payload }) {
      updateLoadingState({
        state,
        key: "loadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    resetUserError(state) {
      updateLoadingState({
        state,
        key: "loadingState",
        loading: false,
      });
    },

    // used by: getBookmarksQuery;
    startNestedLoading(state) {
      updateLoadingState({ state, key: "nestedLoadingState" });
    },

    resetNestedLoadingState(state) {
      updateLoadingState({ state, key: "nestedLoadingState", loading: false });
    },

    setUserNestedError(state, { payload }) {
      updateLoadingState({
        state,
        key: "nestedLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    resetUserNestedError(state) {
      updateLoadingState({
        state,
        key: "nestedLoadingState",
        loading: false,
      });
    },

    // ================================ //
    // ========== Searching ========== //
    // ============================== //
    setSearchError(state, { payload }) {
      updateLoadingState({
        state,
        key: "searchLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    resetSearchError(state) {
      updateLoadingState({
        state,
        key: "searchLoadingState",
        loading: false,
        error: false,
      });
    },

    searchUser(state) {
      updateLoadingState({ state, key: "searchLoadingState" });
    },

    setSearchResult(state, { payload }) {
      state.searchResult = payload;
      updateLoadingState({ state, key: "searchLoadingState", loading: false });
    },

    resetSearchResult(state) {
      state.searchResult = [];
      updateLoadingState({ state, key: "searchLoadingState" });
    },

    // ============================== //
    // ========== Profile ========== //
    // ============================ //

    getUserProfile(state) {
      updateLoadingState({ state, key: "loadingState" });
    },

    setUserProfile(state, { payload }) {
      state.user = {};
      Object.keys(payload).map((key) => (state.user[key] = payload[key]));
    },

    // ========================================= //
    // ========== User Related Posts ========== //
    // ======================================= //

    getProfilePosts() {},

    getFeedPosts() {},

    getBookmarks() {},

    setNewFriend(state, { payload }) {
      state.user.friends.unshift(payload);
      state.user.friendsAmount = state.user.friendsAmount += 1;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  startLoading,
  resetLoadingState,
  setUserError,
  resetUserError,
  startNestedLoading,
  resetNestedLoadingState,
  setUserNestedError,
  resetUserNestedError,
  setSearchError,
  resetSearchError,
  searchUser,
  setSearchResult,
  resetSearchResult,
  getUserProfile,
  setUserProfile,
  setNewFriend,
  getProfilePosts,
  getFeedPosts,
  getBookmarks,
} = userSlice.actions;

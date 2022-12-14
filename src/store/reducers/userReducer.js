import { createSlice } from "@reduxjs/toolkit";
import { updateLoadingState } from "./helpers";

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
    user: {},
    searchResult: [],
  },

  reducers: {
    resetLoadingState(state) {
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    resetNestedLoadingState(state) {
      updateLoadingState({ state, key: "nestedLoadingState", loading: false });
    },

    startLoading(state) {
      updateLoadingState({ state, key: "loadingState", loading: true });
    },

    startNestedLoading(state) {
      updateLoadingState({ state, key: "nestedLoadingState", loading: true });
    },

    searchUser() {},

    setSearchResult(state, { payload }) {
      state.searchResult = payload;
    },

    resetSearchResult(state) {
      state.searchResult = [];
    },

    getUserProfile(state) {
      updateLoadingState({ state, key: "loadingState", loading: true });
    },

    setUserProfile(state, { payload }) {
      state.user = {};
      Object.keys(payload).map((key) => (state.user[key] = payload[key]));
    },

    setNewFriend(state, { payload }) {
      state.user.friends.unshift(payload);
      state.user.friendsAmount = state.user.friendsAmount += 1;
    },

    getProfilePosts() {},

    getFeedPosts() {},

    getBookmarks() {},
  },
});

export const userReducer = userSlice.reducer;
export const {
  resetLoadingState,
  resetNestedLoadingState,
  startLoading,
  startNestedLoading,
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

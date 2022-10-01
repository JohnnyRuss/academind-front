import { createSlice } from '@reduxjs/toolkit';
import { updateLoadingState } from './helpers';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // For Top Level like Feed And Profile
    loadingState: {
      loading: false,
      error: false,
      message: '',
    },
    // For nested routes like profile/bookmark or profile/about
    nestedLoadingState: {
      loading: false,
      error: false,
      message: '',
    },
    user: {},
    searchResult: [],
  },

  reducers: {
    resetLoadingState(state) {
      updateLoadingState(state, 'loadingState', false);
    },

    resetNestedLoadingState(state) {
      updateLoadingState(state, 'nestedLoadingState', false);
    },

    startLoading(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    startNestedLoading(state) {
      updateLoadingState(state, 'nestedLoadingState', true);
    },

    searchUser() {},

    setSearchResult(state, { payload }) {
      state.searchResult = payload;
    },

    resetSearchResult(state) {
      state.searchResult = [];
    },

    getUserProfile(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    setUserProfile(state, { payload }) {
      state.user = {};
      Object.keys(payload).map((key) => (state.user[key] = payload[key]));
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
  getProfilePosts,
  getFeedPosts,
  getBookmarks,
} = userSlice.actions;

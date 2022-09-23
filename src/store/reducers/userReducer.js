import { createSlice } from '@reduxjs/toolkit';

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
      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    resetNestedLoadingState(state) {
      state.nestedLoadingState.loading = false;
      state.nestedLoadingState.error = false;
      state.nestedLoadingState.message = '';
    },

    searchUser() {},

    setSearchResult(state, { payload }) {
      state.searchResult = payload;
    },

    resetSearchResult(state) {
      state.searchResult = [];
    },

    getUserProfile(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    setUserProfile(state, { payload }) {
      state.user = {};
      Object.keys(payload).map((key) => (state.user[key] = payload[key]));
    },

    getProfilePosts() {},

    getFeedPosts(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    getBookmarks(state) {
      state.nestedLoadingState.loading = true;
      state.nestedLoadingState.error = false;
      state.nestedLoadingState.message = '';
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  resetLoadingState,
  resetNestedLoadingState,
  searchUser,
  setSearchResult,
  resetSearchResult,
  getUserProfile,
  setUserProfile,
  getProfilePosts,
  getFeedPosts,
  getBookmarks,
} = userSlice.actions;

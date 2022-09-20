import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingState: {
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
      Object.keys(payload).map((key) => (state.user[key] = payload[key]));
    },

    getProfilePosts() {},

    getFeedPosts(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  resetLoadingState,
  searchUser,
  setSearchResult,
  resetSearchResult,
  getUserProfile,
  setUserProfile,
  getProfilePosts,
  getFeedPosts,
} = userSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: '',
    },
    allFriends: [],
    pendingRequests: [],
    sentRequests: [],
  },
  reducers: {
    sendFriendRequest() {},

    cancelFriendRequest() {},

    deleteFriendRequest() {},

    confirmFriendRequest() {},

    deleteFriend() {},

    getAllFriends(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    setFriends(state, { payload }) {
      state.allFriends = [...payload];

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    getPendingRequests(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    setPendingRequests(state, { payload }) {
      state.pendingRequests = [...payload];

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    getSentRequests(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },

    setSentRequests(state, { payload }) {
      state.sentRequests = [...payload];

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = '';
    },
  },
});

export const friendsReducer = friendsSlice.reducer;
export const {
  sendFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  confirmFriendRequest,
  deleteFriend,
  getAllFriends,
  setFriends,
  getPendingRequests,
  setPendingRequests,
  getSentRequests,
  setSentRequests,
} = friendsSlice.actions;

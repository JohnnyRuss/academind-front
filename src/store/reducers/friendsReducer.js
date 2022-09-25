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
    searchKey: '',
  },
  reducers: {
    setSearchKey(state, { payload }) {
      state.searchKey = payload;
    },

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

    setDeletedFriend(state, { payload }) {
      state.allFriends = state.allFriends.filter((friend) => friend.friend._id !== payload);
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

    setDeletedRequest(state, { payload }) {
      state.pendingRequests = state.pendingRequests.filter(
        (request) => request.adressat._id !== payload
      );
    },

    setConfirmedRequest(state, { payload }) {
      state.pendingRequests = state.pendingRequests.filter(
        (request) => request.adressat._id !== payload
      );
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

    setCanceledRequest(state, { payload }) {
      state.sentRequests = state.sentRequests.filter((request) => request.adressat._id !== payload);
    },
  },
});

export const friendsReducer = friendsSlice.reducer;
export const {
  setSearchKey,
  sendFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  confirmFriendRequest,
  deleteFriend,
  getAllFriends,
  setFriends,
  setDeletedFriend,
  getPendingRequests,
  setPendingRequests,
  setDeletedRequest,
  setConfirmedRequest,
  getSentRequests,
  setSentRequests,
  setCanceledRequest,
} = friendsSlice.actions;

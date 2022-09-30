import { createSlice } from '@reduxjs/toolkit';
import { updateLoadingState } from './helpers';

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
      updateLoadingState(state, 'loadingState', true);
    },

    setFriends(state, { payload }) {
      state.allFriends = [...payload];
      updateLoadingState(state, 'loadingState', false);
    },

    setDeletedFriend(state, { payload }) {
      state.allFriends = state.allFriends.filter((friend) => friend.friend._id !== payload);
    },

    getPendingRequests(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    setPendingRequests(state, { payload }) {
      state.pendingRequests = [...payload];
      updateLoadingState(state, 'loadingState', false);
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
      updateLoadingState(state, 'loadingState', true);
    },

    setSentRequests(state, { payload }) {
      state.sentRequests = [...payload];
      updateLoadingState(state, 'loadingState', false);
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

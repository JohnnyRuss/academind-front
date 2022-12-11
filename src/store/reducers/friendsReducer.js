import { createSlice } from "@reduxjs/toolkit";
import { updateLoadingState } from "./helpers";

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    allFriends: [],
    pendingRequests: [],
    sentRequests: [],
    searchKey: "",
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
      updateLoadingState({ state, key: "loadingState", loading: true });
    },

    setFriends(state, { payload }) {
      state.allFriends = payload.map((friend) => ({
        ...friend.friend,
        muntual: friend.muntual,
      }));
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setDeletedFriend(state, { payload }) {
      state.allFriends = state.allFriends.filter(
        (friend) => friend._id !== payload
      );
    },

    getPendingRequests(state) {
      updateLoadingState({ state, key: "loadingState", loading: true });
    },

    setPendingRequests(state, { payload }) {
      state.pendingRequests = state.sentRequests = payload.map((req) => ({
        ...req.pendingRequest,
        muntuals: req.muntuals,
      }));
      
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setDeletedRequest(state, { payload }) {
      state.pendingRequests = state.pendingRequests.filter(
        (request) => request.adressat._id !== payload
      );
    },

    setConfirmedRequest(state, { payload }) {
      state.pendingRequests = state.pendingRequests.filter(
        (request) => request._id !== payload
      );
    },

    getSentRequests(state) {
      updateLoadingState({ state, key: "loadingState", loading: true });
    },

    setSentRequests(state, { payload }) {
      state.sentRequests = payload.map((req) => ({
        ...req.sentRequest,
        muntuals: req.muntuals,
      }));

      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setCanceledRequest(state, { payload }) {
      state.sentRequests = state.sentRequests.filter(
        (request) => request.adressat._id !== payload
      );
    },

    resetFriends(state) {
      if (state.allFriends[0]) state.allFriends = [];
      else if (state.pendingRequests[0]) state.pendingRequests = [];
      else if (state.sentRequests[0]) state.sentRequests = [];
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
  resetFriends,
} = friendsSlice.actions;

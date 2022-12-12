import { createSlice } from "@reduxjs/toolkit";

const badgeSlice = createSlice({
  name: "badge",
  initialState: {
    requestCount: {
      count: 0,
      ids: [],
    },
    messageCount: {
      count: 0,
      ids: [],
    },
    notificationCount: {
      count: 0,
      ids: [],
    },
  },
  reducers: {
    getUnseenRequestsCount() {},

    setUnseenRequestsCount(state, { payload }) {
      state.requestCount = {
        count: payload.length,
        ids: payload,
      };
    },

    resetUnseenRequestsCount() {},

    setResetedRequestsCount(state) {
      state.requestCount = {
        count: 0,
        ids: [],
      };
    },

    getUnseenConversationsCount() {},

    setUnseenConversationsCount(state, { payload }) {
      state.messageCount = {
        count: payload.length,
        ids: payload,
      };
    },

    resetUnseenConversationsCount() {},

    setResetedConversationsCount(state) {
      state.messageCount = {
        count: 0,
        ids: [],
      };
    },

    getUnseenNotificationsCount() {},

    setUnseenNotificationsCount(state, { payload }) {
      state.notificationCount = {
        count: payload.length,
        ids: payload,
      };
    },

    resetUnseenNotificationsCount() {},

    setResetedNotificationsCount(state) {
      state.notificationCount = {
        count: 0,
        ids: [],
      };
    },
  },
});

export const badgeReducer = badgeSlice.reducer;
export const {
  getUnseenRequestsCount,
  setUnseenRequestsCount,
  resetUnseenRequestsCount,
  setResetedRequestsCount,
  getUnseenConversationsCount,
  setUnseenConversationsCount,
  resetUnseenConversationsCount,
  setResetedConversationsCount,
  getUnseenNotificationsCount,
  setUnseenNotificationsCount,
  resetUnseenNotificationsCount,
  setResetedNotificationsCount,
} = badgeSlice.actions;

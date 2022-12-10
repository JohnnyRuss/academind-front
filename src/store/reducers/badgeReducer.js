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
    getRequestCount() {},

    setRequestCount(state, { payload }) {
      state.requestCount = {
        count: payload.length,
        ids: payload,
      };
    },

    getMessageCount() {},

    setMessageCount(state, { payload }) {
      state.messageCount = {
        count: payload.length,
        ids: payload,
      };
    },

    resetMessageCount(state) {
      state.messageCount = {
        count: 0,
        ids: [],
      };
    },

    getNotificationCount() {},

    setNotificationCount(state, { payload }) {
      state.notificationCount = {
        count: payload.length,
        ids: payload,
      };
    },
  },
});

export const badgeReducer = badgeSlice.reducer;
export const {
  getRequestCount,
  setRequestCount,
  getMessageCount,
  setMessageCount,
  resetMessageCount,
  getNotificationCount,
  setNotificationCount,
} = badgeSlice.actions;

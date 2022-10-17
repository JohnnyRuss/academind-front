import { createSlice } from '@reduxjs/toolkit';
import { updateLoadingState } from './helpers';

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState: {
    loadingState: {
      loading: null,
      error: false,
      message: '',
    },
    user: {
      _id: '',
      email: '',
      firstName: '',
      lastName: '',
      userName: '',
      profileImg: '',
      coverImg: '',
      role: '',
      createdAt: null,
      isAuthenticated: false,
    },
    notifications: [],
    activeNotifications: false,
  },
  reducers: {
    login(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    resetLoadingState(state) {
      updateLoadingState(state, 'loadingState', null);
    },

    setActiveUser(state, { payload }) {
      const temp = {
        _id: payload._id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        profileImg: payload.profileImg,
        coverImg: payload.coverImg,
        createdAt: payload.createdAt,
        role: payload.role,
        isAuthenticated: true,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.setItem('academind_passport', JSON.stringify(payload.accessToken));

      updateLoadingState(state, 'loadingState', false);
    },

    setUpdatedUserCover(state, { payload }) {
      const { field, value } = payload;
      state.user[field] = value;
    },

    getActiveUser() {},

    setActiveNotifications(state, { payload }) {
      state.activeNotifications = payload;
    },

    getNotifications(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    setNotifications(state, { payload }) {
      state.notifications = payload;
      updateLoadingState(state, 'loadingState', false);
    },

    deleteNotification() {},

    setDeletedNotification(state, { payload }) {
      state.notifications = state.notifications.filter((notify) => notify._id !== payload);
    },

    deleteAllNotification() {},

    setDeleteAllNotifaction(state) {
      state.notifications = [];
    },

    markNotificationAsRead() {},

    setMarkedNotification(state, { payload }) {
      const i = state.notifications.findIndex((notify) => notify._id === payload._id);
      state.notifications[i] = { ...state.notifications[i], ...payload };
    },

    markAllNotificationAsRead() {},

    setAllNotificationAsRead(state) {
      state.notifications = state.notifications.map((notify) => ({ ...notify, read: true }));
    },

    getPendingPosts(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    getHiddenPosts(state) {
      updateLoadingState(state, 'loadingState', true);
    },

    logOut(state) {
      const temp = {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        profileImg: '',
        coverImg: '',
        createdAt: null,
        role: '',
        isAuthenticated: false,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.removeItem('academind_passport');
    },
  },
});

export const activeUserReducer = activeUserSlice.reducer;
export const {
  login,
  resetLoadingState,
  setActiveUser,
  setUpdatedUserCover,
  getActiveUser,
  setActiveNotifications,
  getNotifications,
  setNotifications,
  deleteNotification,
  setDeletedNotification,
  deleteAllNotification,
  setDeleteAllNotifaction,
  markNotificationAsRead,
  setMarkedNotification,
  markAllNotificationAsRead,
  setAllNotificationAsRead,
  getPendingPosts,
  getHiddenPosts,
  logOut,
} = activeUserSlice.actions;

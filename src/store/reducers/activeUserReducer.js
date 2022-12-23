import { createSlice } from "@reduxjs/toolkit";

function updateNotificationState({
  state,
  loading = true,
  error = false,
  message,
  task,
}) {
  state.notificationLoadingState.loading = loading;
  state.notificationLoadingState.error = error ? true : false;
  state.notificationLoadingState.message = error ? message : "";
  state.notificationLoadingState.task = error ? task : "";
}

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    loadingState: {
      loading: null,
      error: false,
      message: "",
    },
    notificationLoadingState: {
      loading: null,
      error: false,
      message: "",
      task: "", // could be "get" | "delete" | "deleteAll" | "mark" | "markAll"
    },
    pendingPostsLoadingState: {
      loading: null,
      error: false,
      message: "",
    },
    user: {
      _id: "",
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      profileImg: "",
      coverImg: "",
      role: "",
      createdAt: null,
      isAuthenticated: false,
    },
    notifications: [],
    activeNotifications: false,
  },
  reducers: {
    resetLoadingState(state, { payload }) {
      state[payload].loading = null;
      state[payload].error = false;
      state[payload].message = "";
    },

    // ===================================== //
    // ========== Authentication ========== //
    // =================================== //

    login(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    logOut(state) {
      const temp = {
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        profileImg: "",
        coverImg: "",
        createdAt: null,
        role: "",
        isAuthenticated: false,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.removeItem("academind_passport");
    },

    // =========================== //
    // ========== User ========== //
    // ========================= //

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
      localStorage.setItem(
        "academind_passport",
        JSON.stringify(payload.accessToken)
      );

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setUpdatedUserCover(state, { payload }) {
      const { field, value } = payload;
      state.user[field] = value;
    },

    getActiveUser() {},

    // ==================================== //
    // ========== Notifications ========== //
    // ================================== //

    setNotificationError(state, { payload }) {
      updateNotificationState({
        state,
        loading: false,
        error: true,
        message: payload.message,
        task: payload.task,
      });
    },

    resetNotificationError(state) {
      updateNotificationState({ state, loading: false });
    },

    setActiveNotifications(state, { payload }) {
      state.activeNotifications = payload;
    },

    getNotifications(state) {
      updateNotificationState({ state });
    },

    setNotifications(state, { payload }) {
      state.notifications = payload;

      updateNotificationState({ state, loading: false });
    },

    deleteNotification(state) {
      if (state.notificationLoadingState.error)
        updateNotificationState({ state, loading: false });
    },

    setDeletedNotification(state, { payload }) {
      state.notifications = state.notifications.filter(
        (notify) => notify._id !== payload
      );
    },

    deleteAllNotification(state) {
      if (state.notificationLoadingState.error)
        updateNotificationState({ state, loading: false });
    },

    setDeleteAllNotifaction(state) {
      state.notifications = [];
    },

    markNotificationAsRead(state) {
      if (state.notificationLoadingState.error)
        updateNotificationState({ state, loading: false });
    },

    setMarkedNotification(state, { payload }) {
      const i = state.notifications.findIndex(
        (notify) => notify._id === payload._id
      );
      state.notifications[i] = { ...state.notifications[i], ...payload };
    },

    markAllNotificationAsRead(state) {
      if (state.notificationLoadingState.error)
        updateNotificationState({ state, loading: false });
    },

    setAllNotificationAsRead(state) {
      state.notifications = state.notifications.map((notify) => ({
        ...notify,
        read: true,
      }));
    },

    // ===================================== //
    // ========== Profile-Review ========== //
    // =================================== //

    setPendingPostsError(state, { payload }) {
      state.pendingPostsLoadingState.loading = false;
      state.pendingPostsLoadingState.error = true;
      state.pendingPostsLoadingState.message = payload.message;
    },

    resetPendingPostsError(state, { payload }) {
      state.pendingPostsLoadingState.loading = false;
      state.pendingPostsLoadingState.error = false;
      state.pendingPostsLoadingState.message = "";
    },

    getPendingPosts(state) {
      state.pendingPostsLoadingState.loading = true;
      state.pendingPostsLoadingState.error = false;
      state.pendingPostsLoadingState.message = "";
    },

    getHiddenPosts(state) {
      state.pendingPostsLoadingState.loading = true;
      state.pendingPostsLoadingState.error = false;
      state.pendingPostsLoadingState.message = "";
    },
  },
});

export const activeUserReducer = activeUserSlice.reducer;
export const {
  resetLoadingState,
  resetPendingPostsError,
  // authenntication
  login,
  logOut,
  // user
  setActiveUser,
  setUpdatedUserCover,
  getActiveUser,
  // notifications
  setNotificationError,
  resetNotificationError,
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
  // profile-review
  setPendingPostsError,
  getPendingPosts,
  getHiddenPosts,
} = activeUserSlice.actions;

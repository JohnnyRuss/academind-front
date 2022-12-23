import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import {
  setSearchError,
  setUserError,
  setUserNestedError,
  setUserProfile,
  setSearchResult,
  resetLoadingState,
  resetNestedLoadingState,
} from "../../reducers/userReducer";
import { setPosts, setBookmarkedPosts } from "../../reducers/postsDataReducer";

import { setUserAboutData, setAboutError } from "../../reducers/aboutReducer";

import {
  setPendingPostsError,
  setNotificationError,
  setNotifications,
  setDeletedNotification,
  setDeleteAllNotifaction,
  setMarkedNotification,
  setAllNotificationAsRead,
  resetLoadingState as resetActiveUserLoadingState,
} from "../../reducers/activeUserReducer";

import {
  queryUserProfile,
  queryUserProfilePosts,
  queryUserFeed,
  queryBookmarks,
  queryUserSearch,
  queryUserAboutData,
  queryUserNotifications,
  queryDeleteUserNotification,
  queryMarkNotificationAsRead,
  queryGetPendingPosts,
  queryGetHiddenPosts,
  queryMarkAllNotificationAsRead,
  queryDeleteAllUserNotification,
} from "../api/userQueries";

export function* searchUserHandler({ payload: key }) {
  try {
    const { data } = yield call(queryUserSearch, key);
    yield put(setSearchResult(data));
  } catch (error) {
    yield showError({
      error,
      location: "searchUserHandler",
      setter: setSearchError,
      setterParams: { message: errorMessages.user.load },
    });
  }
}

export function* getUserProfileHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserProfile, userId);
    yield put(setUserProfile(data));
    yield put(resetLoadingState());
  } catch (error) {
    yield showError({
      error,
      location: "getUserProfileHandler",
      setter: setUserError,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

export function* getProfilePostsHandler({
  payload: { id: userID, page, limit, hasMore },
}) {
  try {
    const { data } = yield call(
      queryUserProfilePosts,
      userID,
      page,
      limit,
      hasMore
    );
    yield put(setPosts({ data: data.data, results: data.results }));
  } catch (error) {
    yield showError({ error, location: "getProfilePostsHandler" });
  }
}

export function* getUserFeedHandler({
  payload: { id: userID, page, limit, hasMore },
}) {
  try {
    const { data } = yield call(queryUserFeed, userID, page, limit, hasMore);
    yield put(setPosts({ data: data.data, results: data.results }));
    yield put(resetLoadingState());
  } catch (error) {
    yield showError({
      error,
      location: "getUserFeedHandler",
      setter: setUserError,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

export function* getBookmarksHandler({
  payload: { id: userID, page, limit, hasMore },
}) {
  try {
    const { data } = yield call(queryBookmarks, userID, page, limit, hasMore);
    yield put(setBookmarkedPosts({ data: data.data, results: data.results }));
    yield put(resetNestedLoadingState());
  } catch (error) {
    yield showError({
      error,
      location: "getBookmarksHandler",
      setter: setUserNestedError,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

export function* getUserAboutDataHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserAboutData, userId);
    yield put(setUserAboutData(data));
  } catch (error) {
    yield showError({
      error,
      location: "getUserAboutDataHandler",
      setter: setAboutError,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

export function* getUserNotificationsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserNotifications, userId);
    yield put(setNotifications(data));
  } catch (error) {
    yield showError({
      error,
      location: "getUserNotificationsHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.load,
        task: "get",
      },
    });
  }
}

export function* deleteUserNotificationHandler({ payload: notifyId }) {
  try {
    yield call(queryDeleteUserNotification, notifyId);
    yield put(setDeletedNotification(notifyId));
  } catch (error) {
    yield showError({
      error,
      location: "deleteUserNotificationHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.delete,
        task: "delete",
      },
    });
  }
}

export function* deleteAllUserNotificationHandler() {
  try {
    yield call(queryDeleteAllUserNotification);
    yield put(setDeleteAllNotifaction());
  } catch (error) {
    yield showError({
      error,
      location: "deleteAllUserNotificationHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.deleteAll,
        task: "deleteAll",
      },
    });
  }
}

export function* markNotificationAsReadHandler({ payload: notifyId }) {
  try {
    const { data } = yield call(queryMarkNotificationAsRead, notifyId);
    yield put(setMarkedNotification(data));
  } catch (error) {
    yield showError({
      error,
      location: "markNotificationAsReadHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.mark,
        task: "mark",
      },
    });
  }
}

export function* markAllNotificationAsReadHandler(payload) {
  try {
    yield call(queryMarkAllNotificationAsRead);
    yield put(setAllNotificationAsRead());
  } catch (error) {
    yield showError({
      error,
      location: "markAllNotificationAsReadHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.markAll,
        task: "markAll",
      },
    });
  }
}

export function* getPendingPostsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetPendingPosts, userId);
    yield put(setPosts({ data }));
    yield put(resetActiveUserLoadingState("pendingPostsLoadingState"));
  } catch (error) {
    yield showError({
      error,
      location: "getPendingPostsHandler",
      setter: setPendingPostsError,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

export function* getHiddenPostsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetHiddenPosts, userId);
    yield put(setPosts({ data }));
    yield put(resetActiveUserLoadingState("pendingPostsLoadingState"));
  } catch (error) {
    yield showError({
      error,
      location: "getHiddenPostsHandler",
      setter: setPendingPostsError,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

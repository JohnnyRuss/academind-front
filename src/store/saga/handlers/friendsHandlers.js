import { call, put } from "redux-saga/effects";
import { showError } from "./errorHandler";

import { isRoute } from "../../../lib/window-location";

import {
  setFriends,
  setPendingRequests,
  setDeletedRequest,
  setConfirmedRequest,
  setSentRequests,
  setCanceledRequest,
  setDeletedFriend,
} from "../../reducers/friendsReducer";

import {
  querySendRequest,
  queryCancelRequest,
  queryDeleteRequest,
  queryConfirmRequest,
  queryDeleteFriend,
  queryGetAllFriends,
  queryGetPendingRequests,
  queryGetSentRequests,
} from "../api/friendsQueries";

import { setNewFriend } from "../../reducers/userReducer";

export function* sendRequestHandler({ payload: userId }) {
  try {
    yield call(querySendRequest, userId);
  } catch (error) {
    yield showError({ error, location: "sendRequestHandler" });
  }
}

export function* cancelRequestHandler({ payload: userId }) {
  try {
    yield call(queryCancelRequest, userId);
    if (isRoute("sent-requests")) yield put(setCanceledRequest(userId));
  } catch (error) {
    yield showError({ error, location: "cancelRequestHandler" });
  }
}

export function* deleteRequestHandler({ payload: userId }) {
  try {
    yield call(queryDeleteRequest, userId);
    if (isRoute("pending-requests")) yield put(setDeletedRequest(userId));
  } catch (error) {
    yield showError({ error, location: "deleteRequestHandler" });
  }
}

export function* confirmRequestHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryConfirmRequest, userId);

    if (isRoute("pending-requests")) {
      yield put(setNewFriend(data));
      yield put(setConfirmedRequest(userId));
    }
  } catch (error) {
    yield showError({ error, location: "confirmRequestHandler" });
  }
}

export function* deleteFriendtHandler({ payload: userId }) {
  try {
    yield call(queryDeleteFriend, userId);
    if (isRoute("all-friends")) yield put(setDeletedFriend(userId));
  } catch (error) {
    yield showError({ error, location: "deleteFriendtHandler" });
  }
}

export function* getAllFriendsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetAllFriends, userId);
    yield put(setFriends(data));
  } catch (error) {
    yield showError({ error, location: "getAllFriendsHandler" });
  }
}

export function* getPendingRequestsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetPendingRequests, userId);
    yield put(setPendingRequests(data));
  } catch (error) {
    yield showError({ error, location: "getPendingRequestsHandler" });
  }
}

export function* getSentRequestsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetSentRequests, userId);
    yield put(setSentRequests(data));
  } catch (error) {
    yield showError({ error, location: "getSentRequestsHandler" });
  }
}

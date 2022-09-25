import { call, put } from 'redux-saga/effects';

import { isRoute } from '../../../utils/window-location';

import {
  setFriends,
  setPendingRequests,
  setDeletedRequest,
  setConfirmedRequest,
  setSentRequests,
  setCanceledRequest,
  setDeletedFriend,
} from '../../reducers/friendsReducer';

import {
  querySendRequest,
  queryCancelRequest,
  queryDeleteRequest,
  queryConfirmRequest,
  queryDeleteFriend,
  queryGetAllFriends,
  queryGetPendingRequests,
  queryGetSentRequests,
} from '../api/friendsQueries';

function* sendRequestHandler({ payload: userId }) {
  try {
    yield call(querySendRequest, userId);
  } catch (error) {
    showError(error, 'sendRequestHandler');
  }
}

function* cancelRequestHandler({ payload: userId }) {
  try {
    yield call(queryCancelRequest, userId);
    if (isRoute('sent-requests')) yield put(setCanceledRequest(userId));
  } catch (error) {
    showError(error, 'cancelRequestHandler');
  }
}

function* deleteRequestHandler({ payload: userId }) {
  try {
    yield call(queryDeleteRequest, userId);
    if (isRoute('pending-requests')) yield put(setDeletedRequest(userId));
  } catch (error) {
    showError(error, 'deleteRequestHandler');
  }
}

function* confirmRequestHandler({ payload: userId }) {
  try {
    yield call(queryConfirmRequest, userId);
    if (isRoute('pending-requests')) yield put(setConfirmedRequest(userId));
  } catch (error) {
    showError(error, 'confirmRequestHandler');
  }
}

function* deleteFriendtHandler({ payload: userId }) {
  try {
    yield call(queryDeleteFriend, userId);
    if (isRoute('all-friends')) yield put(setDeletedFriend(userId));
  } catch (error) {
    showError(error, 'deleteFriendtHandler');
  }
}

function* getAllFriendsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetAllFriends, userId);
    yield put(setFriends(data));
  } catch (error) {
    showError(error, 'getAllFriendsHandler');
  }
}

function* getPendingRequestsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetPendingRequests, userId);
    yield put(setPendingRequests(data));
  } catch (error) {
    showError(error, 'getPendingRequestsHandler');
  }
}

function* getSentRequestsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetSentRequests, userId);
    yield put(setSentRequests(data));
  } catch (error) {
    showError(error, 'getSentRequestsHandler');
  }
}

function showError(error, location) {
  console.log({
    error: true,
    location: `sagaHandler - ${location}`,
    message: error?.response?.data?.message || error.message,
    err: error,
    stack: error.stack,
  });
}

export {
  sendRequestHandler,
  cancelRequestHandler,
  deleteRequestHandler,
  confirmRequestHandler,
  deleteFriendtHandler,
  getAllFriendsHandler,
  getPendingRequestsHandler,
  getSentRequestsHandler,
};

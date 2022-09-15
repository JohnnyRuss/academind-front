import { takeLatest } from 'redux-saga/effects';

import { getUserProfile, searchUser } from '../../reducers/userReducer';
import { getUserProfileHandler, searchUserHandler } from '../handlers/userHandlers';

function* userSaga() {
  yield takeLatest(getUserProfile, getUserProfileHandler);
  yield takeLatest(searchUser, searchUserHandler);
}

export default userSaga;

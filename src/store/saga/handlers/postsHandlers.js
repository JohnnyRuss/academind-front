import { call, put } from 'redux-saga/effects';

import { setProfilePosts, setPostReaction } from '../../reducers/postsDataReducer';

import { queryProfilePosts, queryPostReaction } from '../api/postQueries';

function* getProfilePostsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryProfilePosts, userId);
    yield put(setProfilePosts(data));
  } catch (error) {
    console.log({
      error: true,
      location: 'sagaHandler - getUserProfileHandler',
      message: error.message,
      stack: error.stack,
    });
  }
}

function* reactOnPostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(queryPostReaction, { postId, body });
    yield put(setPostReaction({ postId, data }));
  } catch (error) {
    console.log({
      error: true,
      location: 'sagaHandler - getUserProfileHandler',
      message: error.message,
      stack: error.stack,
    });
  }
}

export { getProfilePostsHandler, reactOnPostHandler };

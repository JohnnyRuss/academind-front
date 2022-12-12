import { all, call, put, select } from "redux-saga/effects";
import { showError } from "./errorHandler";

import {
  setPostComments,
  setNewComment,
  setNewCommentReply,
  setDeletedComment,
  setDeletedCommentReply,
  setUpdatedComment,
  setUpdatedCommentReply,
  setReactionOnComment,
  setReactionOnCommentReply,
  setPinnedComment,
  setPinnedCommentReply,
} from "../../reducers/commentsDataReducer";

import {
  queryPostComments,
  queryAddComment,
  queryAddCommentReply,
  queryDeleteComment,
  queryDeleteCommentReply,
  queryUpdateComment,
  queryUpdateCommentReply,
  queryReactionOnComment,
  queryReactionOnCommentReply,
  queryPinComment,
  queryPinCommentReply,
} from "../api/commentsQueries";

import {
  encreasePostCommentCount,
  decreasePostCommentCount,
} from "../../reducers/postsDataReducer";

export function* getPostsCommentsHandler({ payload: postId }) {
  try {
    const { data } = yield call(queryPostComments, postId);
    yield put(setPostComments({ postId, data }));
  } catch (error) {
    showError(error, "getPostsCommentsHandler");
  }
}

export function* addCommentHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(queryAddComment, { postId, body });
    yield all([
      put(setNewComment({ postId, data })),
      put(encreasePostCommentCount(postId)),
    ]);
  } catch (error) {
    showError(error, "addCommentHandler");
  }
}

export function* addCommentReplyHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryAddCommentReply, {
      commentId: params.commentId,
      body,
    });
    yield all([
      put(setNewCommentReply({ params, data })),
      put(encreasePostCommentCount(params.postId)),
    ]);
  } catch (error) {
    showError(error, "addCommentReplyHandler");
  }
}

export function* deleteCommentHandler({ payload: params }) {
  try {
    const deletedCommentCount = yield select(
      (state) =>
        state.commentsData.comments
          .find((commentsBlock) => commentsBlock.postId === params.postId)
          .comments.find((comment) => comment._id === params.commentId)
          .repliesAmount
    );

    yield call(queryDeleteComment, params.commentId);

    yield all([
      put(setDeletedComment({ params })),
      put(
        decreasePostCommentCount({ postId: params.postId, deletedCommentCount })
      ),
    ]);
  } catch (error) {
    showError(error, "deleteCommentHandler");
  }
}

export function* deleteCommentReplyHandler({ payload: params }) {
  try {
    yield call(queryDeleteCommentReply, {
      commentId: params.commentId,
      replyId: params.replyId,
    });

    yield all([
      put(setDeletedCommentReply({ params })),
      put(decreasePostCommentCount({ postId: params.postId })),
    ]);
  } catch (error) {
    showError(error, "deleteCommentReplyHandler");
  }
}

export function* updateCommentHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryUpdateComment, {
      commentId: params.commentId,
      body,
    });
    yield put(setUpdatedComment({ params, data }));
  } catch (error) {
    showError(error, "updateCommentHandler");
  }
}

export function* updateCommentReplyHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryUpdateCommentReply, {
      commentId: params.commentId,
      replyId: params.replyId,
      body,
    });
    yield put(setUpdatedCommentReply({ params, data }));
  } catch (error) {
    showError(error, "updateCommentReplyHandler");
  }
}

export function* reactOnCommentHandler({ payload: params }) {
  try {
    const { data } = yield call(queryReactionOnComment, params.commentId);
    yield put(setReactionOnComment({ params, data }));
  } catch (error) {
    showError(error, "reactOnCommentHandler");
  }
}

export function* reactOnCommentReplyHandler({ payload: params }) {
  try {
    const { data } = yield call(queryReactionOnCommentReply, {
      commentId: params.commentId,
      replyId: params.replyId,
    });
    yield put(setReactionOnCommentReply({ params, data }));
  } catch (error) {
    showError(error, "reactOnCommentReplyHandler");
  }
}

export function* pinCommentHandler({ payload: params }) {
  try {
    const { data } = yield call(queryPinComment, params.commentId);
    yield put(setPinnedComment({ params, data }));
  } catch (error) {
    showError(error, "pinCommentHandler");
  }
}

export function* pinCommentReplyHandler({ payload: params }) {
  try {
    const { data } = yield call(queryPinCommentReply, {
      commentId: params.commentId,
      replyId: params.replyId,
    });
    yield put(setPinnedCommentReply({ params, data }));
  } catch (error) {
    showError(error, "pinCommentReplyHandler");
  }
}

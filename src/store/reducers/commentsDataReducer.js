import { createSlice } from "@reduxjs/toolkit";
import { updateLoadingState } from "./helpers";

const commentsDataSlice = createSlice({
  name: "CommentsData",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    comments: [],
  },
  reducers: {
    getPostComments(state) {
      updateLoadingState({
        state,
        key: "loadingState",
        loading: true,
      });
    },

    setPostComments(state, { payload }) {
      const { postId, data } = payload;

      const existingCommentsBockIndex = state.comments.findIndex(
        (block) => block.postId === postId
      );

      if (existingCommentsBockIndex >= 0)
        state.comments[existingCommentsBockIndex].comments = data;
      else state.comments = [...state.comments, { postId, comments: data }];

      updateLoadingState({
        state,
        key: "loadingState",
        loading: false,
      });
    },

    addComment() {},

    setNewComment(state, { payload }) {
      const { postId, data } = payload;
      const i = state.comments.findIndex(
        (commentBlock) => commentBlock.postId === postId
      );
      if (i >= 0)
        state.comments[i].comments = [...state.comments[i].comments, data];
      else state.comments.push({ postId, comments: [data] });
    },

    addCommentReply() {},

    setNewCommentReply(state, { payload }) {
      const { params, data } = payload;

      const parentComment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments?.find((comment) => comment._id === params.commentId);

      parentComment.replies.push(data);
      parentComment.repliesAmount = parentComment.repliesAmount += 1;
    },

    deleteComment() {},

    setDeletedComment(state, { payload }) {
      const { params } = payload;

      const commentsBlock = state.comments.find(
        (commentBlock) => commentBlock.postId === params.postId
      );

      commentsBlock.comments = commentsBlock.comments?.filter(
        (comment) => comment._id !== params.commentId
      );

      if (!commentsBlock.comments[0])
        state.comments = state.comments.filter(
          (block) => block.postId !== commentsBlock.postId
        );
    },

    deleteCommentReply() {},

    setDeletedCommentReply(state, { payload }) {
      const { params } = payload;

      const parentComment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments?.find((comment) => comment._id === params.commentId);

      parentComment.replies = parentComment.replies.filter(
        (reply) => reply._id !== params.replyId
      );
      parentComment.repliesAmount = parentComment.repliesAmount -= 1;
    },

    updateComment() {},

    setUpdatedComment(state, { payload }) {
      const { params, data } = payload;
      const comment = state.comments
        .find((commentsBlock) => commentsBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      comment.text = data.text;
      comment.tags = data.tags;
    },

    updateCommentReply() {},

    setUpdatedCommentReply(state, { payload }) {
      const { params, data } = payload;
      const comment = state.comments
        .find((commentsBlock) => commentsBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      const i = comment.replies.findIndex(
        (reply) => reply._id === params.replyId
      );
      comment.replies[i].text = data.text;
      comment.replies[i].tags = data.tags;
    },

    reactOnComment() {},

    setReactionOnComment(state, { payload }) {
      const { params, data } = payload;

      const comment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      comment.likesAmount = data.likesAmount;
      comment.reactions = data.reactions;
    },

    reactOnCommentReply() {},

    setReactionOnCommentReply(state, { payload }) {
      const { params, data } = payload;

      const commentReply = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId)
        .replies.find((reply) => reply._id === params.replyId);

      commentReply.likesAmount = data.likesAmount;
      commentReply.reactions = data.reactions;
    },

    pinComment() {},

    setPinnedComment(state, { payload }) {
      const { params, data } = payload;

      const comment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      comment.pin = data.pin;
    },

    pinCommentReply() {},

    setPinnedCommentReply(state, { payload }) {
      const { params, data } = payload;

      const commentReply = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId)
        .replies.find((reply) => reply._id === params.replyId);

      commentReply.pin = data.pin;
    },

    resetComments(state) {
      state.comments = [];
    },
  },
});

export const commentsDataReducer = commentsDataSlice.reducer;
export const {
  getPostComments,
  setPostComments,
  addComment,
  setNewComment,
  addCommentReply,
  setNewCommentReply,
  deleteComment,
  setDeletedComment,
  deleteCommentReply,
  setDeletedCommentReply,
  updateComment,
  setUpdatedComment,
  updateCommentReply,
  setUpdatedCommentReply,
  reactOnComment,
  setReactionOnComment,
  reactOnCommentReply,
  setReactionOnCommentReply,
  pinComment,
  setPinnedComment,
  pinCommentReply,
  setPinnedCommentReply,
  resetComments,
} = commentsDataSlice.actions;

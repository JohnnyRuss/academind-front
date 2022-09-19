import { createSlice } from '@reduxjs/toolkit';

const commentsDataSlice = createSlice({
  name: 'CommentsData',
  initialState: {
    getCommentsLoadingState: {
      loading: false,
      error: false,
      message: '',
    },
    comments: [],
  },
  reducers: {
    getPostComments(state) {
      state.getCommentsLoadingState.loading = true;
      state.getCommentsLoadingState.error = false;
      state.getCommentsLoadingState.message = '';
    },

    setPostComments(state, { payload }) {
      const { postId, data } = payload;
      state.comments = [...state.comments, { postId, comments: data }];

      state.getCommentsLoadingState.loading = false;
      state.getCommentsLoadingState.error = false;
      state.getCommentsLoadingState.message = '';
    },

    addComment() {},

    setNewComment(state, { payload }) {
      const { postId, data } = payload;
      const i = state.comments.findIndex((commentBlock) => commentBlock.postId === postId);
      console.log(i);
      if (i && i >= 0) state.comments[i].comments = [...state.comments[i].comments, data];
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
        state.comments = state.comments.filter((block) => block.postId !== commentsBlock.postId);
    },

    deleteCommentReply() {},

    setDeletedCommentReply(state, { payload }) {
      const { params } = payload;

      const parentComment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments?.find((comment) => comment._id === params.commentId);

      parentComment.replies = parentComment.replies.filter((reply) => reply._id !== params.replyId);
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

      const i = comment.replies.findIndex((reply) => reply._id === params.replyId);
      comment.replies[i].text = data.text;
      comment.replies[i].tags = data.tags;
    },

    reactOnComment() {},

    setReactionOnComment(state, { payload }) {
      const { params, data } = payload;

      const comment = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId);

      if (data) {
        comment.likesAmount = data.likesAmount;
        // comment.reactions.push(data.reaction);
      } else {
        comment.likesAmount -= 1;
        // comment.reactions.flter(reaction=>)
      }
    },

    reactOnCommentReply() {},

    setReactionOnCommentReply(state, { payload }) {
      const { params, data } = payload;

      const commentReply = state.comments
        .find((commentBlock) => commentBlock.postId === params.postId)
        .comments.find((comment) => comment._id === params.commentId)
        .replies.find((reply) => reply._id === params.replyId);

      if (data) {
        commentReply.likesAmount = data.likesAmount;
        // comment.reactions.push(data.reaction);
      } else {
        commentReply.likesAmount -= 1;
        // comment.reactions.flter(reaction=>)
      }
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
} = commentsDataSlice.actions;

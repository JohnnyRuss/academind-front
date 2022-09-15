import { axiosQuery } from '../../axiosConfig';

async function queryPostComments(postId) {
  return await axiosQuery(`/posts/${postId}/comments`);
}

async function queryAddComment({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}/comments`, body);
}

async function queryAddCommentReply({ commentId, body }) {
  return await axiosQuery.post(`/comments/${commentId}/reply`, body);
}

async function queryDeleteComment(commentId) {
  return await axiosQuery.delete(`/comments/${commentId}`);
}

async function queryDeleteCommentReply({ commentId, replyId }) {
  return await axiosQuery.delete(`/comments/${commentId}/reply/${replyId}`);
}

async function queryUpdateComment({ commentId, body }) {
  return await axiosQuery.patch(`/comments/${commentId}`, body);
}

async function queryUpdateCommentReply({ commentId, replyId, body }) {
  return await axiosQuery.patch(`/comments/${commentId}/reply/${replyId}`, body);
}

async function queryReactionOnComment(commentId) {
  return await axiosQuery.patch(`/comments/${commentId}/reaction`);
}

async function queryReactionOnCommentReply({ commentId, replyId }) {
  return await axiosQuery.patch(`/comments/${commentId}/reply/${replyId}/reaction`);
}

async function queryPinComment(commentId) {
  return await axiosQuery.patch(`/comments/${commentId}/pin`);
}

async function queryPinCommentReply({ commentId, replyId }) {
  return await axiosQuery.patch(`/comments/${commentId}/reply/${replyId}/pin`);
}

export {
  queryPostComments,
  queryAddComment,
  queryAddCommentReply,
  queryDeleteCommentReply,
  queryDeleteComment,
  queryUpdateComment,
  queryUpdateCommentReply,
  queryReactionOnComment,
  queryReactionOnCommentReply,
  queryPinComment,
  queryPinCommentReply,
};

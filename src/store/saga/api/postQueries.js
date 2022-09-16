import { axiosQuery } from '../../axiosConfig';

async function queryCreatePost(body) {
  return await axiosQuery.post(`/posts`, body);
}

async function queryDeletePost(postId) {
  return await axiosQuery.delete(`/posts/${postId}`);
}

async function queryUpdatePost({ postId, body }) {
  return await axiosQuery.patch(`/posts/${postId}`, body);
}

async function queryPostReaction({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}/reaction`, body);
}

export { queryCreatePost, queryPostReaction, queryUpdatePost, queryDeletePost };

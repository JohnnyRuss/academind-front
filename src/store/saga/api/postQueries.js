import { axiosQuery, axiosFormDataQuery } from '../../axiosConfig';

async function queryCreatePost(body) {
  return await axiosFormDataQuery.post(`/posts`, body);
}

async function queryDeletePost(postId) {
  return await axiosQuery.delete(`/posts/${postId}`);
}

async function queryUpdatePost({ postId, body }) {
  return await axiosFormDataQuery.patch(`/posts/${postId}`, body);
}

async function queryPostReaction({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}/reaction`, body);
}

async function querySharePost({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}`, body);
}

async function querySavePost(postId) {
  return await axiosQuery.post(`/posts/${postId}/bookmark`);
}

async function queryBlogPosts(page, limit, hasMore) {
  return await axiosQuery(`/posts/blogPosts?page=${page}&limit=${limit}&hasMore=${hasMore}`);
}

async function queryGetPost(postId) {
  return await axiosQuery(`/posts/${postId}`);
}

export {
  queryCreatePost,
  queryPostReaction,
  queryUpdatePost,
  queryDeletePost,
  querySharePost,
  querySavePost,
  queryBlogPosts,
  queryGetPost,
};

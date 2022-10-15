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

async function queryChangePostAudience({ postId, body }) {
  return await axiosQuery.patch(`/posts/${postId}/audience`, body);
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

async function queryBlogPosts(page, limit, hasMore, query) {
  return await axiosQuery(
    `/posts/blogPosts?page=${page}&limit=${limit}&hasMore=${hasMore}${query}`
  );
}

async function queryTopRatedBlogPosts(limit) {
  return await axiosQuery(`/posts/blogPosts/topRated?limit=${limit}`);
}

async function queryTopRatedPublishers(limit) {
  return await axiosQuery(`/posts/blogPosts/topRatedPublishers?limit=${limit}`);
}

async function queryRelatedPosts(postId, limit) {
  return await axiosQuery(`/posts/blogPosts/relatedPosts/${postId}?limit=${limit}`);
}

async function queryGetPost(postId) {
  return await axiosQuery(`/posts/${postId}`);
}

async function queryShowPostOnProfile(postId, body) {
  return await axiosQuery.patch(`/posts/${postId}/aprove-post`, body);
}

async function queryRemoveTagOnPost(postId) {
  return await axiosQuery.delete(`/posts/${postId}/tag`);
}

export {
  queryCreatePost,
  queryPostReaction,
  queryUpdatePost,
  queryDeletePost,
  querySharePost,
  querySavePost,
  queryBlogPosts,
  queryTopRatedBlogPosts,
  queryTopRatedPublishers,
  queryRelatedPosts,
  queryGetPost,
  queryChangePostAudience,
  queryShowPostOnProfile,
  queryRemoveTagOnPost,
};

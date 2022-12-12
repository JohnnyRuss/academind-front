import { axiosQuery, axiosFormDataQuery } from "../../axiosConfig";

export async function queryCreatePost(body) {
  return await axiosFormDataQuery.post(`/posts`, body);
}

export async function queryDeletePost(postId) {
  return await axiosQuery.delete(`/posts/${postId}`);
}

export async function queryUpdatePost({ postId, body }) {
  return await axiosFormDataQuery.patch(`/posts/${postId}`, body);
}

export async function queryChangePostAudience({ postId, body }) {
  return await axiosQuery.patch(`/posts/${postId}/audience`, body);
}

export async function queryPostReaction({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}/reaction`, body);
}

export async function querySharePost({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}`, body);
}

export async function querySavePost(postId) {
  return await axiosQuery.post(`/posts/${postId}/bookmark`);
}

export async function queryBlogPosts(page, limit, hasMore, query) {
  return await axiosQuery(
    `/posts/blogPosts?page=${page}&limit=${limit}&hasMore=${hasMore}${query}`
  );
}

export async function queryTopRatedBlogPosts(limit) {
  return await axiosQuery(`/posts/blogPosts/topRated?limit=${limit}`);
}

export async function queryTopRatedPublishers(limit) {
  return await axiosQuery(`/posts/blogPosts/topRatedPublishers?limit=${limit}`);
}

export async function queryRelatedPosts(postId, limit) {
  return await axiosQuery(
    `/posts/blogPosts/relatedPosts/${postId}?limit=${limit}`
  );
}

export async function queryGetPost(postId) {
  return await axiosQuery(`/posts/${postId}`);
}

export async function queryShowPostOnProfile(postId, body) {
  return await axiosQuery.patch(`/posts/${postId}/aprove-post`, body);
}

export async function queryAddPostToProfile(postId) {
  return await axiosQuery.patch(`/posts/${postId}/show-post`);
}

export async function queryHidePostFromProfile(postId) {
  return await axiosQuery.patch(`/posts/${postId}/hide-post`);
}

export async function queryRemoveTagOnPost(postId) {
  return await axiosQuery.delete(`/posts/${postId}/tag`);
}

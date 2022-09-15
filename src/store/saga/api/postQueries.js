import { axiosQuery } from '../../axiosConfig';

async function queryProfilePosts(userId) {
  return await axiosQuery(`/profile/${userId}/posts`);
}

async function queryPostReaction({ postId, body }) {
  return await axiosQuery.post(`/posts/${postId}/reaction`, body);
}

export { queryProfilePosts, queryPostReaction };

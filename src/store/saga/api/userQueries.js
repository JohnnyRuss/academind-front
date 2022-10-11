import { axiosQuery } from '../../axiosConfig';

async function queryUserProfile(userId) {
  return await axiosQuery(`/user/${userId}/profile`);
}

async function queryUserProfilePosts(userId, page, limit, hasMore) {
  return await axiosQuery(
    `/user/${userId}/profile/posts?page=${page}&limit=${limit}&hasMore=${hasMore}`
  );
}

async function queryUserFeed(userId, page, limit, hasMore) {
  return await axiosQuery(`/user/${userId}/feed?page=${page}&limit=${limit}&hasMore=${hasMore}`);
}

async function queryBookmarks(userId, page, limit, hasMore) {
  return await axiosQuery(
    `/user/${userId}/profile/bookmarks?page=${page}&limit=${limit}&hasMore=${hasMore}`
  );
}

async function queryUserAboutData(userId) {
  return await axiosQuery(`/user/about/${userId}`);
}

async function queryUserSearch(key) {
  return await axiosQuery(`/user/search?key=${key}`);
}

export {
  queryUserProfile,
  queryUserProfilePosts,
  queryUserFeed,
  queryUserAboutData,
  queryBookmarks,
  queryUserSearch,
};

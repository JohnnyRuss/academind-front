import { axiosQuery } from '../../axiosConfig';

async function queryUserProfile(userId) {
  return await axiosQuery(`/user/${userId}/profile`);
}

async function queryUserProfilePosts(userId) {
  return await axiosQuery(`/user/${userId}/profile/posts`);
}

async function queryUserFeed(userId) {
  return await axiosQuery(`/user/${userId}/feed`);
}

async function queryBookmarks(userId) {
  return await axiosQuery(`/user/${userId}/profile/bookmarks`);
}

async function queryUserAboutData(userId) {
  return await axiosQuery(`/user/${userId}/about`);
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

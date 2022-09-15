import { axiosQuery } from '../../axiosConfig';

async function queryUserProfile(userId) {
  return await axiosQuery(`/user/${userId}/profile`);
}

async function queryUserFeed(userId) {
  return await axiosQuery(`/user/${userId}/feed`);
}

async function queryUserSearch(key) {
  return await axiosQuery(`/user/search?key=${key}`);
}

export { queryUserProfile, queryUserFeed, queryUserSearch };

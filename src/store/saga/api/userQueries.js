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

async function queryUserNotifications(userId) {
  return await axiosQuery(`/notifications/${userId}`);
}

async function queryDeleteUserNotification(notifyId) {
  return await axiosQuery.delete(`/notifications/notify/${notifyId}`);
}

async function queryDeleteAllUserNotification() {
  return await axiosQuery.delete(`/notifications`);
}

async function queryMarkNotificationAsRead(notifyId) {
  return await axiosQuery.patch(`/notifications/notify/${notifyId}`);
}

async function queryMarkAllNotificationAsRead() {
  return await axiosQuery.patch(`/notifications`);
}

async function queryGetPendingPosts(userId) {
  return await axiosQuery(`/user/${userId}/profile/pending-posts`);
}

async function queryGetHiddenPosts(userId) {
  return await axiosQuery(`/user/${userId}/profile/hidden-posts`);
}

export {
  queryUserProfile,
  queryUserProfilePosts,
  queryUserFeed,
  queryUserAboutData,
  queryBookmarks,
  queryUserSearch,
  queryUserNotifications,
  queryDeleteUserNotification,
  queryDeleteAllUserNotification,
  queryMarkNotificationAsRead,
  queryMarkAllNotificationAsRead,
  queryGetPendingPosts,
  queryGetHiddenPosts,
};

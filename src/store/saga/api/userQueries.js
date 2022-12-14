import { axiosQuery } from "../../axiosConfig";

export async function queryUserProfile(userId) {
  return await axiosQuery(`/user/${userId}/profile`);
}

export async function queryUserProfilePosts(userId, page, limit, hasMore) {
  return await axiosQuery(
    `/user/${userId}/profile/posts?page=${page}&limit=${limit}&hasMore=${hasMore}`
  );
}

export async function queryUserFeed(userId, page, limit, hasMore) {
  return await axiosQuery(
    `/user/${userId}/feed?page=${page}&limit=${limit}&hasMore=${hasMore}`
  );
}

export async function queryBookmarks(userId, page, limit, hasMore) {
  return await axiosQuery(
    `/user/${userId}/profile/bookmarks?page=${page}&limit=${limit}&hasMore=${hasMore}`
  );
}

export async function queryUserAboutData(userId) {
  return await axiosQuery(`/user/about/${userId}`);
}

export async function queryUserSearch(key) {
  return await axiosQuery(`/user/search?key=${key}`);
}

export async function queryUserNotifications(userId) {
  return await axiosQuery(`/notifications/${userId}`);
}

export async function queryDeleteUserNotification(notifyId) {
  return await axiosQuery.delete(`/notifications/notify/${notifyId}`);
}

export async function queryDeleteAllUserNotification() {
  return await axiosQuery.delete(`/notifications`);
}

export async function queryMarkNotificationAsRead(notifyId) {
  return await axiosQuery.patch(`/notifications/notify/${notifyId}`);
}

export async function queryMarkAllNotificationAsRead() {
  return await axiosQuery.patch(`/notifications`);
}

export async function queryGetPendingPosts(userId) {
  return await axiosQuery(`/user/${userId}/profile/pending-posts`);
}

export async function queryGetHiddenPosts(userId) {
  return await axiosQuery(`/user/${userId}/profile/hidden-posts`);
}

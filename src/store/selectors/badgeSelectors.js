export const selectRequestCount = ({ badges }) => badges.requestCount.count;

export const selectMessageCount = ({ badges }) => badges.messageCount.count;

export const selectNotificationCount = ({ badges }) =>
  badges.notificationCount.count;

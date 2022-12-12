import { useDispatch } from "react-redux";

import {
  markAllNotificationAsRead,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotification,
  getNotifications,
} from "../../store/reducers/activeUserReducer";

function useNotificationQuery() {
  const dispatch = useDispatch();

  function markAllNotificationAsReadQuery() {
    dispatch(markAllNotificationAsRead());
  }

  function markNotificationAsReadQuery(notificationId) {
    dispatch(markNotificationAsRead(notificationId));
  }

  function deleteNotificationQuery(notificationId) {
    dispatch(deleteNotification(notificationId));
  }

  function deleteAllNotificationQuery() {
    dispatch(deleteAllNotification());
  }

  function getNotificationsQuery(userId) {
    dispatch(getNotifications(userId));
  }

  return {
    markAllNotificationAsReadQuery,
    markNotificationAsReadQuery,
    deleteAllNotificationQuery,
    deleteNotificationQuery,
    getNotificationsQuery,
  };
}

export default useNotificationQuery;

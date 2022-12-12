import { useDispatch } from "react-redux";
import {
  getUnseenRequestsCount,
  resetUnseenRequestsCount,
  getUnseenConversationsCount,
  resetUnseenConversationsCount,
  getUnseenNotificationsCount,
  resetUnseenNotificationsCount,
} from "../../store/reducers/badgeReducer";

export default function useBadgeQuery() {
  const dispatch = useDispatch();

  function getUnseenRequestCountQuery(userId) {
    dispatch(getUnseenRequestsCount(userId));
  }

  function resetUnseenRequestsCountQuery(userId) {
    dispatch(resetUnseenRequestsCount(userId));
  }

  function getUnseenConversationsCountQuery(userId) {
    dispatch(getUnseenConversationsCount(userId));
  }

  function resetUnseenConversationsCountQuery(userId) {
    dispatch(resetUnseenConversationsCount(userId));
  }

  function getNotificationCountQuery(userId) {
    dispatch(getUnseenNotificationsCount(userId));
  }

  function resetUnseenNotificationsCountQuery(userId) {
    console.log("runs unseen notifies count reset");
    dispatch(resetUnseenNotificationsCount(userId));
  }

  return {
    getUnseenRequestCountQuery,
    resetUnseenRequestsCountQuery,
    getUnseenConversationsCountQuery,
    resetUnseenConversationsCountQuery,
    getNotificationCountQuery,
    resetUnseenNotificationsCountQuery,
  };
}

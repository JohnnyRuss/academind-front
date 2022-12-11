import { useDispatch } from "react-redux";
import {
  getUnseenRequestsCount,
  getUnseenConversationsCount,
  resetUnseenConversationsCount,
  getNotificationCount,
  resetUnseenRequestsCount,
} from "../../store/reducers/badgeReducer";

export default function useBadgeQuery() {
  const dispatch = useDispatch();

  function getUnseenRequestCountQuery(userId) {
    dispatch(getUnseenRequestsCount(userId));
  }

  function resetUnseenRequestsCountQuery(userId) {
    console.log('runs reset unseen request count');
    dispatch(resetUnseenRequestsCount(userId));
  }

  function getUnseenConversationsCountQuery(userId) {
    dispatch(getUnseenConversationsCount(userId));
  }

  function resetUnseenConversationsCountQuery(userId) {
    dispatch(resetUnseenConversationsCount(userId));
  }

  function getNotificationCountQuery(userId) {
    dispatch(getNotificationCount(userId));
  }

  return {
    getUnseenRequestCountQuery,
    resetUnseenRequestsCountQuery,
    getUnseenConversationsCountQuery,
    resetUnseenConversationsCountQuery,
    getNotificationCountQuery,
  };
}

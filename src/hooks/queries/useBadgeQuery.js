import { useDispatch } from "react-redux";
import {
  getRequestCount,
  getMessageCount,
  getNotificationCount,
  resetMessageCount,
} from "../../store/reducers/badgeReducer";

export default function useBadgeQuery() {
  const dispatch = useDispatch();

  // API Tasks
  function getRequestCountQuery(userId) {
    dispatch(getRequestCount(userId));
  }

  function getMessageCountQuery(userId) {
    dispatch(getMessageCount(userId));
  }

  function getNotificationCountQuery(userId) {
    dispatch(getNotificationCount(userId));
  }

  // NoN API Tasks
  function resetMessageCountHandler() {
    dispatch(resetMessageCount());
  }

  return {
    getRequestCountQuery,
    getMessageCountQuery,
    resetMessageCountHandler,
    getNotificationCountQuery,
  };
}

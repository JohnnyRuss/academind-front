/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectActiveUserId,
  selectIsActiveNotifications,
} from "../../../store/selectors/activeUserSelectors";
import { selectAllBadgeCount } from "../../../store/selectors/badgeSelectors";
import { setActiveNotifications } from "../../../store/reducers/activeUserReducer";
import { useBlurOnBody, useBadgeQuery } from "../../../hooks";

import styles from "./styles/navActions.module.scss";
import { NavSearchBar, NavAvatar } from "./";
import {
  UserFriendRequestsIcon,
  EmailIcon,
  NotificationIcon,
  BurgerIcon,
} from "../../Layouts/Icons/icons";

function NavActions() {
  const dispatch = useDispatch();

  const activeNotifications = useSelector(selectIsActiveNotifications);
  const activeUserId = useSelector(selectActiveUserId);
  const { requestCount, messageCount, notificationCount } =
    useSelector(selectAllBadgeCount);

  const activateNotifications = () =>
    dispatch(setActiveNotifications(!activeNotifications));

  const deactivateNotifications = () => dispatch(setActiveNotifications(false));

  const { onFocus } = useBlurOnBody(
    activateNotifications,
    deactivateNotifications,
    ["notification--modal", "notification--nav__btn"]
  );

  const {
    getUnseenRequestCountQuery,
    getUnseenConversationsCountQuery,
    getNotificationCountQuery,
  } = useBadgeQuery();

  useEffect(() => {
    getUnseenRequestCountQuery(activeUserId);
    getUnseenConversationsCountQuery(activeUserId);
    getNotificationCountQuery(activeUserId);
  }, []);

  return (
    <div className={styles.mainNavActions}>
      <NavSearchBar />
      <button className={styles.actionBtn}>
        <Link to={`/profile/${activeUserId}/friends/pending-requests`}>
          <UserFriendRequestsIcon />
        </Link>
        {requestCount > 0 && (
          <span className={styles.actionBadge}>{requestCount}</span>
        )}
      </button>
      <button className={styles.actionBtn}>
        <Link to="/messanger">
          <EmailIcon />
        </Link>
        {messageCount > 0 && (
          <span className={styles.actionBadge}>{messageCount}</span>
        )}
      </button>
      <button
        onClick={onFocus}
        className={`notification--nav__btn ${styles.actionBtn}`}
      >
        <NotificationIcon />
        {notificationCount > 0 && (
          <span className={styles.actionBadge}>{notificationCount}</span>
        )}
      </button>
      <button className={styles.mainNavActionsBurgerBtn}>
        <BurgerIcon />
      </button>
      <NavAvatar />
    </div>
  );
}

export default NavActions;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectUserId } from "../../../store/selectors/userSelectors";
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

  const { activeNotifications } = useSelector(({ activeUser }) => activeUser);
  const { id: activeUserId } = useSelector(selectUserId);
  const { requestCount, messageCount, notificationCount } = useSelector(
    (state) => state.badges
  );

  const activateNotifications = () =>
    dispatch(setActiveNotifications(!activeNotifications));

  const deactivateNotifications = () => dispatch(setActiveNotifications(false));

  const { onFocus } = useBlurOnBody(
    activateNotifications,
    deactivateNotifications,
    ["notification--modal", "notification--nav__btn"]
  );

  const {
    getRequestCountQuery,
    getMessageCountQuery,
    getNotificationCountQuery,
  } = useBadgeQuery();

  useEffect(() => {
    getRequestCountQuery(activeUserId);
    getMessageCountQuery(activeUserId);
    getNotificationCountQuery(activeUserId);
  }, []);

  return (
    <div className={styles.mainNavActions}>
      <NavSearchBar />
      <button className={styles.actionBtn}>
        <Link to={`/profile/${activeUserId}/friends/pending-requests`}>
          <UserFriendRequestsIcon />
        </Link>
        {requestCount.count > 0 && (
          <span className={styles.actionBadge}>{requestCount.count}</span>
        )}
      </button>
      <button className={styles.actionBtn}>
        <Link to="/messanger">
          <EmailIcon />
        </Link>
        {messageCount.count > 0 && (
          <span className={styles.actionBadge}>{messageCount.count}</span>
        )}
      </button>
      <button
        onClick={onFocus}
        className={`notification--nav__btn ${styles.actionBtn}`}
      >
        <NotificationIcon />
        {notificationCount.count > 0 && (
          <span className={styles.actionBadge}>{notificationCount.count}</span>
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

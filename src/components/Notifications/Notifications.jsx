/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectActiveUserId,
  selectNotifications,
  selectNotificationsLoadingState,
} from "../../store/selectors/activeUserSelectors";
import { selectNotificationCount } from "../../store/selectors/badgeSelectors";
import { setActiveNotifications } from "../../store/reducers/activeUserReducer";
import { useNotificationQuery, useBadgeQuery } from "../../hooks";

import styles from "./styles/notifications.module.scss";
import NotificationBody from "./NotificationBody";
import { BlockSpinner, Error } from "../Layouts";

function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeUserId = useSelector(selectActiveUserId);
  const notifications = useSelector(selectNotifications);
  const { loading, error, message, task } = useSelector(
    selectNotificationsLoadingState
  );
  const unseenNotificationCount = useSelector(selectNotificationCount);

  const [activeNotification, setActiveNotification] = useState("");

  const {
    handleResetNotificationError,
    deleteAllNotificationQuery,
    deleteNotificationQuery,
    getNotificationsQuery,
    markAllNotificationAsReadQuery,
    markNotificationAsReadQuery,
  } = useNotificationQuery();

  const { resetUnseenNotificationsCountQuery } = useBadgeQuery();

  function handleNavigate(notify) {
    if (notify.target.targetType === "blogPost")
      navigate(`/blog/${notify.location}`, { state: notify.target?.options });
    else if (
      notify.target.targetType === "post" &&
      notify.target.options?.isNewTag
    )
      navigate(`/profile/${activeUserId}/profile-review/tags`, {
        state: notify.target?.options,
      });
    else if (notify.target.targetType === "post")
      navigate(`/post/${notify.location}`, { state: notify.target?.options });
    else if (
      notify.target.targetType === "user" &&
      notify.target.options.isRequested
    )
      navigate(`/profile/${activeUserId}/friends/pending-requests`);
    else if (
      notify.target.targetType === "user" &&
      notify.target.options.isConfirmed
    )
      navigate(`/profile/${notify.location}/posts`);

    dispatch(setActiveNotifications(false));

    if (!notify.read) markNotificationAsReadQuery(notify._id);
  }

  const handleMarkAsRead = (notificationId) =>
    markNotificationAsReadQuery(notificationId);

  const handleMarkAllAsRead = () => markAllNotificationAsReadQuery();

  const handleDeleteNotify = (notificationId) =>
    deleteNotificationQuery(notificationId);

  const handleDeleteAllNotification = () => deleteAllNotificationQuery();

  useEffect(() => {
    getNotificationsQuery(activeUserId);
    unseenNotificationCount > 0 &&
      resetUnseenNotificationsCountQuery(activeUserId);
  }, []);

  return (
    <>
      <div
        className={`${styles.notificationPopUp} ${
          !loading ? styles.expanded : ""
        } notification--modal`}
      >
        <div className={styles.cleanerBtnsBox}>
          <button onClick={handleMarkAllAsRead}>mark all as read</button>
          <button onClick={handleDeleteAllNotification}>
            clear all notifications
          </button>
        </div>
        {loading && <BlockSpinner />}
        {!loading &&
          (!error || (error && task !== "get")) &&
          notifications[0] &&
          notifications.map((notify) => (
            <NotificationBody
              key={notify._id}
              notify={notify}
              handleNavigate={handleNavigate}
              activeNotification={activeNotification}
              setActiveNotification={setActiveNotification}
              handleMarkAsRead={handleMarkAsRead}
              handleDeleteNotify={handleDeleteNotify}
            />
          ))}
        {!loading && !error && !notifications[0] && (
          <p className={styles.message}>there are no notifications</p>
        )}
        {error && task === "get" && <Error msg={message} />}
      </div>
      {error && task !== "get" && (
        <Error
          asModal={true}
          msg={message}
          onClose={handleResetNotificationError}
          className={styles.notificationModalError}
        />
      )}
    </>
  );
}

export default Notifications;

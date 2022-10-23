/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getNotifications,
  deleteNotification,
  deleteAllNotification,
  setActiveNotifications,
  markNotificationAsRead,
  markAllNotificationAsRead,
} from '../../store/reducers/activeUserReducer';

import { selectUserId } from '../../store/selectors/userSelectors';

import styles from './styles/notifications.module.scss';
import NotificationBody from './NotificationBody';
import { BlockSpinner } from '../Interface';

function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useSelector(selectUserId);
  const {
    notifications,
    loadingState: { loading },
  } = useSelector(({ activeUser }) => activeUser);

  const [activeNotification, setActiveNotification] = useState('');

  function handleNavigate(notify) {
    // console.log(notify)
    if (notify.target.targetType === 'blogPost')
      navigate(`/blog/${notify.location}`, { state: notify.target?.options });
    else if (notify.target.targetType === 'post' && notify.target.options?.isNewTag)
      navigate(`/profile/${id}/profile-review/tags`, { state: notify.target?.options });
    else if (notify.target.targetType === 'post')
      navigate(`/post/${notify.location}`, { state: notify.target?.options });
    else if (notify.target.targetType === 'user' && notify.target.options.isRequested)
      navigate(`/profile/${id}/friends/pending-requests`);
    else if (notify.target.targetType === 'user' && notify.target.options.isConfirmed)
      navigate(`/profile/${notify.location}/posts`);

    dispatch(setActiveNotifications(false));

    if (!notify.read) dispatch(markNotificationAsRead(notify._id));
  }

  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  const handleMarkAllAsRead = () => dispatch(markAllNotificationAsRead());

  const handleDeleteNotify = (id) => dispatch(deleteNotification(id));

  const handleDeleteAllNotification = () => dispatch(deleteAllNotification());

  useEffect(() => {
    dispatch(getNotifications(id));
  }, []);

  return (
    <div className={`${styles.notificationPopUp} notification--modal`}>
      <div className={styles.cleanerBtnsBox}>
        <button onClick={handleMarkAllAsRead}>mark all as read</button>
        <button onClick={handleDeleteAllNotification}>clear all notifications</button>
      </div>
      {loading && <BlockSpinner />}
      {!loading &&
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
      {!loading && !notifications[0] && (
        <p className={styles.message}>there are no notifications</p>
      )}
    </div>
  );
}

export default Notifications;

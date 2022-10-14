/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getNotifications,
  deleteNotification,
  setActiveNotifications,
  markNotificationAsRead,
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
    if (notify.target === 'blogPost') navigate(`/blog/${notify.location}`);
    else if (notify.target === 'post') navigate(`/post/${notify.location}`);
    dispatch(setActiveNotifications(false));

    if (!notify.read) dispatch(markNotificationAsRead(notify._id));
  }

  function handleMarkAsRead(id) {
    dispatch(markNotificationAsRead(id));
  }

  function handleDeleteNotify(id) {
    dispatch(deleteNotification(id));
  }

  useEffect(() => {
    dispatch(getNotifications(id));
  }, []);

  return (
    <div className={styles.notificationPopUp}>
      <div className={styles.cleanerBtnsBox}>
        <button>mark all as read</button>
        <button>clear all notifications</button>
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

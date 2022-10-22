import { useState } from 'react';

import styles from './styles/notificationBody.module.scss';
import { TimeAgo, Image } from '../Interface';
import { DotsHorizontalIcon, DeleteIcon, ReadIcon } from '../Layouts/Icons/icons';

function NotificationBody({
  notify,
  handleNavigate,
  activeNotification,
  setActiveNotification,
  handleMarkAsRead,
  handleDeleteNotify,
}) {
  const [activeNotifyModal, setActiveNotifyModal] = useState(false);

  const activateNotifyOpt = (e) => {
    e.stopPropagation();
    setActiveNotification(notify._id);
    setActiveNotifyModal((prev) => !prev);
  };

  function showNotificationMessage(notify) {
    if (notify.target?.options?.postAuthorUserName) {
      const message = notify.message.split(`${'PostAuthorPlaceholder'}`);
      return (
        <>
          <strong className={styles.userName}>{notify.from.userName}</strong>{' '}
          <span>{message[0]}</span> <strong>{notify.target.options.postAuthorUserName}</strong>
          <span>{message[1]}</span>
        </>
      );
    } else
      return (
        <>
          <strong className={styles.userName}>{notify.from.userName}</strong>{' '}
          <span>{notify.message}</span>
        </>
      );
  }

  return (
    <div
      className={`${styles.notifyBody} ${notify.read ? '' : styles.unRead}`}
      onClick={() => handleNavigate(notify)}>
      <Image src={notify.from.profileImg} className={styles.notifyFig} />
      <p>
        {showNotificationMessage(notify)}
        <TimeAgo date={notify.createdAt} className={styles.notifyTime} />
      </p>
      <div className={styles.notifyPopUpBox}>
        <button className={styles.notifyOptBtn} onClick={activateNotifyOpt}>
          <DotsHorizontalIcon />
        </button>
        {activeNotifyModal && activeNotification === notify._id && (
          <div className={styles.notifyOptionsList}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsRead(notify._id);
                setActiveNotifyModal(false);
              }}>
              <ReadIcon />
              mark as read
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNotify(notify._id);
                setActiveNotifyModal(false);
              }}>
              <DeleteIcon />
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationBody;

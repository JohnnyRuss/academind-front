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

  return (
    <div
      className={`${styles.notifyBody} ${notify.read ? '' : styles.unRead}`}
      onClick={() => handleNavigate(notify)}>
      <Image src={notify.from.profileImg} className={styles.notifyFig} />
      <p>
        <strong>{notify.from.userName}</strong> <span>{notify.message}</span>
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

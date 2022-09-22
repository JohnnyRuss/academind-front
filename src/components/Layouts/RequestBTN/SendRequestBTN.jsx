import styles from './requestBtn.module.scss';
import { AddToFriendsIcon } from '../Icons/icons';

function SendRequestBTN() {
  return (
    <button className={`${styles.btn} ${styles.sendBtn}`}>
      <AddToFriendsIcon /> <span>send request</span>
    </button>
  );
}

export default SendRequestBTN;

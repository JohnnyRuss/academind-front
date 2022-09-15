import styles from './requestBtn.module.scss';
import { CancelFriendRequestIcon } from '../Icons/icons';

function CancelBTN({ className }) {
  return (
    <button className={`${styles.btn} ${styles.cancelBtn} ${className}`}>
      <CancelFriendRequestIcon />
      <span>cancel request</span>
    </button>
  );
}

export default CancelBTN;

import styles from './requestBtn.module.scss';
import { ConfirmFriendRequestIcon } from '../Icons/icons';

function ConfirmRequestBtn() {
  return (
    <button className={`${styles.btn} ${styles.confirmBtn}`}>
      <ConfirmFriendRequestIcon /> <span>confirm request</span>
    </button>
  );
}

export default ConfirmRequestBtn;

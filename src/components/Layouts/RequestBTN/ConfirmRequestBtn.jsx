import styles from './requestBtn.module.scss';
import { ConfirmFriendRequestIcon } from '../Icons/icons';

function ConfirmRequestBtn({ onClick }) {
  return (
    <button className={`${styles.btn} ${styles.confirmBtn}`} onClick={onClick}>
      <ConfirmFriendRequestIcon /> <span>confirm request</span>
    </button>
  );
}

export default ConfirmRequestBtn;

import styles from './requestBtn.module.scss';
import { DeleteFriendRequestIcon } from '../Icons/icons';

function DeleteRequestBTN({ className }) {
  return (
    <button className={`${styles.btn} ${styles.deleteBtn} ${className}`}>
      <DeleteFriendRequestIcon />
      <span>delete request</span>
    </button>
  );
}

export default DeleteRequestBTN;

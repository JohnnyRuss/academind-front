import styles from './requestBtn.module.scss';
import { DeleteFriendRequestIcon } from '../Icons/icons';

function DeleteRequestBTN({ onClick }) {
  return (
    <button className={`${styles.btn} ${styles.deleteBtn} `} onClick={onClick}>
      <DeleteFriendRequestIcon />
      <span>delete request</span>
    </button>
  );
}

export default DeleteRequestBTN;

import styles from './requestBtn.module.scss';
import { EmailIcon } from '../Icons/icons';

function SendMessageBTN() {
  return (
    <button className={`${styles.btn} ${styles.sendMessageBtn}`}>
      <EmailIcon /> <span>send message</span>
    </button>
  );
}

export default SendMessageBTN;

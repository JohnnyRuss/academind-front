import { Image } from '../../Interface';
import styles from './request.module.scss';

function RequestItemBody({ children }) {
  return (
    <div className={styles.requestItem}>
      <Image src='/img/user-1.jpg' className={styles.friendImg} />
      <h4 className={styles.friendName}>friend name</h4>
      <span className={styles.muntuals}>6 muntual friends</span>
      {children}
    </div>
  );
}

export default RequestItemBody;

import { Image, Link } from '../../Interface';
import styles from './styles/request.module.scss';

function RequestItemBody({ children, img, userName, userId, muntuals }) {
  return (
    <div className={styles.requestItem}>
      <Image src={img} className={styles.friendImg} />
      <Link path={`/profile/${userId}/posts`} className={styles.friendName}>
        {userName}
      </Link>
      <span className={styles.muntuals}>{muntuals} muntual friends</span>
      {children}
    </div>
  );
}

export default RequestItemBody;

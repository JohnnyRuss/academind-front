import styles from './styles/reviewUserDetails.module.scss';
import { Avatar, Link, TimeAgo } from '../../../Interface';

function ReviewUserDetails({ createdAt, title, userName, userImg }) {
  return (
    <span>
      <Link path={{ pathname: '/blog/id', query: { user: userName } }} target='_blank'>
        <h3 data-title className={styles.blogPostTitle}>
          {title}
        </h3>
      </Link>
      <div className={styles.publisher}>
        <Avatar className={styles.avatar} img={userImg} />
        <span>{userName}</span>
      </div>
      <TimeAgo date={createdAt} />
    </span>
  );
}

export default ReviewUserDetails;

import { uid } from 'uid';

import styles from './styles/topRatedPublishers.module.scss';
import { Image } from '../../../Interface';

function TopRatedPublishers() {
  return (
    <ul className={styles.topRatedPublishers}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <li className={styles.topRatedPublisher} key={uid(6)}>
          <Image src='/img/user-4.jpg' className={styles.userImg} />
          <span className={styles.details}>
            <h3 className={styles.userName}>nemo</h3>
            <span className={styles.postsAmount}>14 blog posts</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TopRatedPublishers;

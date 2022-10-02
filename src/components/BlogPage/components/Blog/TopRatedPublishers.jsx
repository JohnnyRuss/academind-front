import { useSelector } from 'react-redux';

import styles from './styles/topRatedPublishers.module.scss';
import { Image, Spinner } from '../../../Interface';

function TopRatedPublishers() {
  const {
    topRatedPublishers: publishers,
    publishersLoadingState: { loading },
  } = useSelector(({ postsData }) => postsData);
  return (
    <ul className={styles.topRatedPublishers}>
      {loading && <Spinner />}
      {!loading &&
        publishers?.map((publisher) => (
          <li className={styles.topRatedPublisher} key={publisher._id}>
            <Image src={publisher.author.profileImg} className={styles.userImg} />
            <span className={styles.details}>
              <h3 className={styles.userName}>{publisher.author.userName}</h3>
              <span className={styles.postsAmount}>{publisher.posts} blog posts</span>
            </span>
          </li>
        ))}
    </ul>
  );
}

export default TopRatedPublishers;

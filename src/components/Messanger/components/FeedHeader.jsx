import { Avatar } from '../../Interface';
import styles from './styles/feedHeader.module.scss';

function FeedHeader({ adressat }) {
  return (
    <div className={styles.feedHeadingBox}>
      <Avatar img={adressat?.profileImg} />
      <p className={styles.feedAuthor}>{adressat?.userName}</p>
    </div>
  );
}

export default FeedHeader;

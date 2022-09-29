import styles from './styles/sharePostHeader.module.scss';
import { PostDescription } from './';
import { UserIdentifier, Tags } from '../../';

/**
 * if post is shared, here will be shown current user avatar and userName
 */
function SharedPostHeader({ data }) {
  return (
    <>
      <div className={styles.sharedPostHeader}>
        <UserIdentifier
          userId={data.authorId}
          userName={data.authorName}
          img={data.authorImg}
          timeAgo={data.createdAt}
          className={styles.sharedPostHeaderIdentifier}
        />
        {data.tags[0] && <Tags tags={data.tags} />}
      </div>
      <PostDescription
        description={data.description}
        className={styles.sharedPostHeaderDescription}
      />
    </>
  );
}

export default SharedPostHeader;

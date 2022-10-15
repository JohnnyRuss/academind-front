import styles from './tags.module.scss';
import { Link } from '../../Interface';

function Tags({ tags, keyWord = 'with' }) {
  const length = tags.length;

  return (
    <div className={styles.tagsList} data-tags>
      <span className={styles.tagKeyWord}>{keyWord} - </span>
      {length === 1 && (
        <Link path={`/profile/${tags[0].user?._id}/posts`} className={styles.tagLink}>
          {tags[0].user?.userName}
        </Link>
      )}
      {length === 2 && (
        <>
          <Link path={`/profile/${tags[0].user?._id}/posts`} className={styles.tagLink}>
            {tags[0].user.userName}
          </Link>
          <span className={styles.tagKeyWord}>&nbsp;and&nbsp;</span>
          <Link path={`/profile/${tags[1].user._id}/posts`} className={styles.tagLink}>
            {tags[1].user.userName}
          </Link>
        </>
      )}
      {length > 2 && (
        <>
          <Link path={`/profile/${tags[0].user._id}/posts`} className={styles.tagLink}>
            {tags[0].user.userName}
          </Link>
          <span className={styles.extraTags}>
            <span className={styles.tagKeyWord}>&nbsp;and&nbsp;</span>
            <strong>{length - 1}&nbsp;others</strong>
            <div className={styles.extraTagsList}>
              {tags.slice(1).map((tag) => (
                <Link path={`/profile/${tag.user._id}/posts`} key={tag._id}>
                  {tag.user.userName}
                </Link>
              ))}
            </div>
          </span>
        </>
      )}
    </div>
  );
}

export default Tags;

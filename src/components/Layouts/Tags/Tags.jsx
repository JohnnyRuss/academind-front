import styles from './tags.module.scss';
import { Link } from '../../Interface';

function Tags({ tags }) {
  const length = tags.length;

  return (
    <div className={styles.tagsList} data-tags>
      <span>with - </span>
      {length === 1 && <Link path={`/profile/${tags[0]._id}/posts`}>{tags[0].userName}</Link>}
      {length === 2 && (
        <>
          <Link path={`/profile/${tags[0]._id}/posts`}>{tags[0].userName}</Link>
          <span>&nbsp;and&nbsp;</span>
          <Link path={`/profile/${tags[1]._id}/posts`}>{tags[1].userName}</Link>
        </>
      )}
      {length > 2 && (
        <>
          <Link path={`/profile/${tags[0]._id}/posts`}>{tags[0].userName}</Link>
          <span>
            &nbsp;and&nbsp;
            <strong>{length - 1}&nbsp;others</strong>
          </span>
        </>
      )}
    </div>
  );
}

export default Tags;

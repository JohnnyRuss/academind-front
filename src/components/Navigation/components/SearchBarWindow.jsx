import styles from './styles/searchBarWindow.module.scss';
import { Link, Avatar } from '../../Interface';

function SearchBarWindow({ result, onChooseHandler }) {
  return (
    <div className={styles.searchWindow}>
      <div className={styles.resultsList}>
        {result?.map((result) => (
          <Link
            path={`/profile/${result._id}/posts`}
            key={result._id}
            className={styles.resultsListItem}
            onClick={onChooseHandler}>
            <Avatar img={result.profileImg} />
            <span>{result.userName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchBarWindow;

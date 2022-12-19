import { Link } from "react-router-dom";
import styles from "./styles/searchBarWindow.module.scss";
import { Avatar } from "../../Layouts";

function SearchBarWindow({ result, onChooseHandler }) {
  return (
    <div
      className={`${styles.searchWindow}  searchbar-window`}
      data-searchbar-window
    >
      <div className={styles.resultsList} data-searchbar-result-list>
        {result?.map((result) => (
          <Link
            to={`/profile/${result._id}/posts`}
            key={result._id}
            className={styles.resultsListItem}
            onClick={onChooseHandler}
          >
            <Avatar img={result.profileImg} />
            <span>{result.userName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchBarWindow;

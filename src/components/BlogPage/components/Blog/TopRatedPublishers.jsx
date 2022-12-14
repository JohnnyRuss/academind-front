import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import {
  selectTopRatedPublishers,
  selectTopRatedPublishersLoadingState,
} from "../../../../store/selectors/postSelectors";

import styles from "./styles/topRatedPublishers.module.scss";
import { Image, Spinner } from "../../../Layouts";

function TopRatedPublishers() {
  const { state: pathState } = useLocation();

  const publishers = useSelector(selectTopRatedPublishers);
  const { loading } = useSelector(selectTopRatedPublishersLoadingState);

  return (
    <ul className={styles.topRatedPublishers}>
      {loading && <Spinner />}
      {!loading &&
        publishers?.map((publisher) => (
          <li className={styles.topRatedPublisher} key={publisher._id}>
            <Link
              to={""}
              state={{
                ...pathState,
                author: pathState?.author
                  ? pathState.author === publisher._id
                    ? ""
                    : publisher._id
                  : publisher._id,
              }}
              className={
                pathState?.author === publisher._id ? styles.activeLink : ""
              }
            >
              <Image
                src={publisher.author.profileImg}
                className={styles.userImg}
              />
              <span className={styles.details}>
                <h3 className={styles.userName}>{publisher.author.userName}</h3>
                <span className={styles.postsAmount}>
                  {publisher.posts} blog posts
                </span>
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default TopRatedPublishers;

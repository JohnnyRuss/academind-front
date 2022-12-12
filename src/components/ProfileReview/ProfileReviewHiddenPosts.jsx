import { useSelector } from "react-redux";

import { useProfileReviewQuery } from "../../hooks";
import { selectPosts } from "../../store/selectors/postSelectors";
import { selectActiveUserLoadingState } from "../../store/selectors/activeUserSelectors";

import styles from "./components/styles/review.module.scss";
import ReviewPostBody from "./components/ReviewPostBody";
import { BlockSpinner } from "../Layouts";

function ProfileReviewHiddenPosts() {
  const { posts } = useSelector(selectPosts);
  const { loading } = useSelector(selectActiveUserLoadingState);

  const { addToProfileHandler } = useProfileReviewQuery();

  return (
    <div className={styles.reviewContainer}>
      {loading === true && <BlockSpinner />}
      {!loading &&
        posts[0] &&
        posts.map((post) => (
          <ReviewPostBody
            post={post}
            showOnProfileHandler={addToProfileHandler}
            onHiddens={true}
            key={post._id}
          />
        ))}
      {!loading && !posts[0] && (
        <p className={styles.message}>there are no hidden posts</p>
      )}
    </div>
  );
}

export default ProfileReviewHiddenPosts;

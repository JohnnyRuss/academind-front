import { useSelector } from "react-redux";

import { selectPosts } from "../../store/selectors/postSelectors";
import { selectActiveUserLoadingState } from "../../store/selectors/activeUserSelectors";
import { useProfileReviewQuery } from "../../hooks";

import styles from "./components/styles/review.module.scss";
import ReviewPostBody from "./components/ReviewPostBody";
import { BlockSpinner } from "../Layouts";

function ProfileReviewTaggedPosts() {
  const { posts } = useSelector(selectPosts);
  const { loading } = useSelector(selectActiveUserLoadingState);
  const { showOnProfileHandler, removeTagHandler } = useProfileReviewQuery();

  return (
    <div className={styles.reviewContainer}>
      {loading === true && <BlockSpinner />}
      {!loading &&
        posts[0] &&
        posts.map((post) => (
          <ReviewPostBody
            post={post}
            removeTagHandler={removeTagHandler}
            showOnProfileHandler={showOnProfileHandler}
            onHiddens={false}
            key={post._id}
          />
        ))}
      {!loading && !posts[0] && (
        <p className={styles.message}>there are no pending posts</p>
      )}
    </div>
  );
}

export default ProfileReviewTaggedPosts;

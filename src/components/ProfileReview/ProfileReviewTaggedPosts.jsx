import { useSelector } from "react-redux";

import { selectPosts } from "../../store/selectors/postSelectors";
import { useProfileReviewQuery } from "../../hooks";

import styles from "./components/styles/review.module.scss";
import ReviewPostBody from "./components/ReviewPostBody";

function ProfileReviewTaggedPosts() {
  const { posts } = useSelector(selectPosts);
  const { showOnProfileHandler, removeTagHandler } = useProfileReviewQuery();

  return (
    <div className={styles.reviewContainer}>
      {posts[0] &&
        posts.map((post) => (
          <ReviewPostBody
            post={post}
            removeTagHandler={removeTagHandler}
            showOnProfileHandler={showOnProfileHandler}
            onHiddens={false}
            key={post._id}
          />
        ))}
      {!posts[0] && (
        <p className={styles.message}>there are no pending posts</p>
      )}
    </div>
  );
}

export default ProfileReviewTaggedPosts;

import { useSelector } from "react-redux";

import { useProfileReviewQuery } from "../../hooks";
import { selectPosts } from "../../store/selectors/postSelectors";

import styles from "./components/styles/review.module.scss";
import ReviewPostBody from "./components/ReviewPostBody";

function ProfileReviewHiddenPosts() {
  const { posts } = useSelector(selectPosts);

  const { addToProfileHandler } = useProfileReviewQuery();

  return (
    <div className={styles.reviewContainer}>
      {posts[0] &&
        posts.map((post) => (
          <ReviewPostBody
            post={post}
            showOnProfileHandler={addToProfileHandler}
            onHiddens={true}
            key={post._id}
          />
        ))}
      {!posts[0] && <p className={styles.message}>there are no hidden posts</p>}
    </div>
  );
}

export default ProfileReviewHiddenPosts;

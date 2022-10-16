import { useSelector } from 'react-redux';

import { selectPosts } from '../../store/selectors/postSelectors';
import { useProfileReviewQuery } from '../../hooks';

import styles from './components/styles/review.module.scss';
import ReviewPostBody from './components/ReviewPostBody';
import { BlockSpinner } from '../Interface';

function ProfileReviewHiddenPosts() {
  const {
    loadingState: { loading },
  } = useSelector(({ activeUser }) => activeUser);
  const { posts } = useSelector(selectPosts);
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
      {!loading && !posts[0] && <p className={styles.message}>there are no hidden posts</p>}
    </div>
  );
}

export default ProfileReviewHiddenPosts;

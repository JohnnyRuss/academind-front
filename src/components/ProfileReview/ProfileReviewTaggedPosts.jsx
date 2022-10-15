import { useSelector } from 'react-redux';

import { selectPosts } from '../../store/selectors/postSelectors';
import { useProfileReviewQuery } from '../../hooks';

import styles from './components/styles/reviewTaggedPosts.module.scss';
import TagReviewPostBody from './components/TagReviewPostBody';

function ProfileReviewTaggedPosts() {
  const { posts } = useSelector(selectPosts);

  const { showOnProfileHandler, removeTagHandler } = useProfileReviewQuery();

  return (
    <div className={styles.reviewTaggedPosts}>
      {posts[0] &&
        posts.map((post) => (
          <TagReviewPostBody
            post={post}
            removeTagHandler={removeTagHandler}
            showOnProfileHandler={showOnProfileHandler}
            key={post._id}
          />
        ))}
      {!posts[0] && <p className={styles.message}>there are no pending posts</p>}
    </div>
  );
}

export default ProfileReviewTaggedPosts;

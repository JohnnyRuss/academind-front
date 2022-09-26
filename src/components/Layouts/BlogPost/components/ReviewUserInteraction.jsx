import styles from './styles/reviewUserInteraction.module.scss';
import { LikeIcon, DislikeIcon, CommentIcon } from '../../../Layouts/Icons/icons';
import BlogPostOptions from './BlogPostOptions';

function ReviewUserInteraction({ postId, comments, options }) {
  return (
    <div data-user-interacion className={styles.blogPostUserInteractionsBox}>
      <BlogPostOptions />
      <div className={styles.blogPostInteractions}>
        <span>
          <LikeIcon />
          (5)
        </span>
        <span>
          <DislikeIcon />
          (4)
        </span>
        <span>
          <CommentIcon />
          (10)
        </span>
      </div>
    </div>
  );
}

export default ReviewUserInteraction;

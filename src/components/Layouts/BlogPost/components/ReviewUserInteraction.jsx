import { useCounter } from '../../../../hooks';

import styles from './reviewUserInteraction.module.scss';
import { OptionsBig, PostActions } from '../../../Layouts';

function ReviewUserInteraction({ postId, comments, options }) {
  const commentsAmount = useCounter(comments, 'replies');

  return (
    <div data-user-interacion className={styles.blogPostUserInteractions}>
      <PostActions
        redirect={true}
        postId={postId}
        commentsAmount={commentsAmount}
        className={styles.blogPostPostActions}
      />
      {options && <OptionsBig />}
    </div>
  );
}

export default ReviewUserInteraction;

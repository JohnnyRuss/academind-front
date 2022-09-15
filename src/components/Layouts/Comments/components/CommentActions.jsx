import styles from './styles/commentActions.module.scss';
import { LikeIcon, ReplyIcon } from '../../Icons/icons';
import { TimeAgo } from '../../../Interface';

/**
 * @returns like and reply buttons and timeAgo Text
 */
function CommentActions({ createdAt, handleReaction, handleReply }) {
  return (
    <div className={styles.commentActions}>
      <button onClick={handleReaction}>
        <LikeIcon />
      </button>
      <button onClick={handleReply}>
        <ReplyIcon />
      </button>
      <TimeAgo date={createdAt} className={styles.commentTimeAgo} />
    </div>
  );
}

export default CommentActions;

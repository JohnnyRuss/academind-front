import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../store/selectors/userSelectors';

import styles from './styles/commentActions.module.scss';
import { LikeIcon, ReplyIcon } from '../../Icons/icons';
import { TimeAgo } from '../../../Interface';

function CommentActions({ createdAt, reactions, handleReaction, handleReply }) {
  const { id } = useSelector(selectUserId);
  const isUserInteracted = reactions.find((reaction) => reaction.author === id)?.reaction;

  return (
    <div className={styles.commentActions}>
      <button onClick={handleReaction} className={isUserInteracted ? styles.userLiked : ''}>
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

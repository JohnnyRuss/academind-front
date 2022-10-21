import styles from './styles/reactionBtn.module.scss';
import { DislikeIcon, LikeIcon } from '../../Icons/icons';

function ReactionBTN({ reactOnPostHandler, reactionsAmount, reaction, isUserInteracted }) {
  return (
    <button
      data-reaction={reaction}
      onClick={reactOnPostHandler}
      className={isUserInteracted === reaction ? styles.userLiked : ''}>
      {reaction ? <LikeIcon /> : <DislikeIcon />}
      <span>({reactionsAmount})</span>
    </button>
  );
}

export default ReactionBTN;

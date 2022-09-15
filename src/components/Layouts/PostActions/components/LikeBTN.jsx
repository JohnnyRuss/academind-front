import { uid } from 'uid';

import styles from './styles/reactionBTN.module.scss';
import { LikeIcon } from '../../Icons/icons';

function LikeBTN({ reactOnPostHandler, likesAmount, reactions }) {
  return (
    <button
      data-reaction={true}
      onClick={reactOnPostHandler}
      className={` ${styles.reactionBtn} ${styles.reactionLikeBtn}`}>
      <LikeIcon />
      <span className={styles.reactionsAmount}>({likesAmount})</span>
      <ul className={`${styles.reactionsList} ${styles.likesList}`}>
        {reactions
          ?.filter((reaction) => reaction.reaction === true)
          .map((reaction) => (
            <li key={uid(6)}>{reaction.author.userName}</li>
          ))}
      </ul>
    </button>
  );
}

export default LikeBTN;

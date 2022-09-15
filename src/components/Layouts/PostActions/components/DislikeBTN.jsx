import { uid } from 'uid';

import styles from './styles/reactionBTN.module.scss';
import { DislikeIcon } from '../../Icons/icons';

function LikeBTN({ reactOnPostHandler, dislikesAmount, reactions }) {
  return (
    <button
      data-reaction={false}
      onClick={reactOnPostHandler}
      className={` ${styles.reactionBtn} ${styles.reactionDislikeBtn}`}>
      <DislikeIcon />
      <span className={styles.reactionsAmount}>({dislikesAmount})</span>
      <ul className={`${styles.reactionsList} ${styles.dislikesList}`}>
        {reactions
          ?.filter((reaction) => reaction.reaction === false)
          .map((reaction) => (
            <li key={uid(6)}>{reaction.author.userName}</li>
          ))}
      </ul>
    </button>
  );
}

export default LikeBTN;

import { useState } from 'react';

import { useForeignUser } from '../../../../hooks';

import styles from './styles/commentContent.module.scss';
import { OptionsMini } from '../../../Layouts';
import { LikeIcon } from '../../../Layouts/Icons/icons';

/**
 * renders comment text and options
 */
function CommentContent({
  postAuthorId,
  commentAuthorId,
  text,
  likesCount,
  handlePinComment,
  handleUpdateCredentials,
  handleDeleteComment,
}) {
  const [showMore, setShowMore] = useState(false);

  const commentText =
    text?.length > 350 && !showMore ? (
      <>
        {text?.slice(0, 350).concat('...')}{' '}
        <button onClick={() => setShowMore(true)} className={styles.showMoreBtn}>
          show more
        </button>
      </>
    ) : (
      text
    );

  const postBelongsToActiveUser = useForeignUser(postAuthorId);
  const commentBelongsToActiveUser = useForeignUser(commentAuthorId);

  return (
    <div className={styles.commentContent}>
      <p className={styles.commentText}>{commentText}</p>
      {likesCount > 0 && (
        <p className={styles.commentReactions}>
          <LikeIcon />
          <span>{likesCount}</span>
        </p>
      )}
      {postBelongsToActiveUser && (
        <OptionsMini
          keyWord='comment'
          belongsActiveUser={commentBelongsToActiveUser}
          pinHandler={handlePinComment}
          updateHandler={handleUpdateCredentials}
          deleteHandler={handleDeleteComment}
          btnClassName={styles.optBtn}
          className={styles.optModal}
        />
      )}
    </div>
  );
}

export default CommentContent;

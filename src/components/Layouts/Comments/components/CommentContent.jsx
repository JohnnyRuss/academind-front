import { useState } from 'react';

import { useForeignUser } from '../../../../hooks';

import styles from './styles/commentContent.module.scss';
import CommentOptions from './CommentOptions';
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

  const { isActiveUser: postBelongsToActiveUser } = useForeignUser('basedOnId', postAuthorId);
  const { isActiveUser: commentBelongsToActiveUser } = useForeignUser('basedOnId', commentAuthorId);

  return (
    <div className={styles.commentContent}>
      <p className={styles.commentText}>{commentText}</p>
      {likesCount > 0 && (
        <p className={styles.commentReactions}>
          <LikeIcon />
          <span>{likesCount}</span>
        </p>
      )}
      <CommentOptions
        postBelongsToActiveUser={postBelongsToActiveUser}
        commentBelongsToActiveUser={commentBelongsToActiveUser}
        pinHandler={handlePinComment}
        updateHandler={handleUpdateCredentials}
        deleteHandler={handleDeleteComment}
      />
    </div>
  );
}

export default CommentContent;

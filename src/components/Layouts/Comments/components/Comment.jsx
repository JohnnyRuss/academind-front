import { useCommentsQuery } from '../../../../hooks';

import styles from './styles/comment.module.scss';
import { UserIdentifier } from '../../';
import { PinIcon } from '../../Icons/icons';
import { CommentContent, CommentActions } from './';

/**
 * comment body, like user identifier, comment text and action buttons-: like and reply buttons and timeAgo text
 * @param {Object} comment object which contains comment information
 * @param {function} setCreateReply passed on reply BTN and returns true||false
 * @returns
 */
function Comment({ type, data, handlers, className }) {
  const { comment, postId, parentId } = data;

  const { handleReactionOnComment, handlePinComment, handleDeleteComment } = useCommentsQuery();

  const commentId = type === 'Parent' ? comment._id : parentId;
  const replyId = type === 'Reply' ? comment._id : '';

  function handleReplyCredentials() {
    handlers.setCommentReply({
      commentId,
      tag: { _id: comment.author._id, userName: comment.author.userName },
    });
  }

  function handleUpdateCredentials() {
    handlers.setUpdateComment({
      commentId,
      replyId,
      text: comment.text,
      type: `update${type}`,
      tags: comment.tags,
    });
  }

  return (
    <div className={`${styles.comment} ${className || ''}`}>
      <UserIdentifier
        userId={comment.author?._id}
        userName={comment.author?.userName}
        img={comment.author?.profileImg}
        withTime={false}
        className={styles.postUserIdentifier}
      />
      {comment.pin && <PinIcon className={styles.pinIcon} />}
      <CommentContent
        text={comment.text}
        likesCount={comment.likesAmount}
        handlePinComment={() => handlePinComment({ type, postId, commentId, replyId })}
        handleUpdateCredentials={handleUpdateCredentials}
        handleDeleteComment={() => handleDeleteComment({ type, postId, commentId, replyId })}
      />
      <CommentActions
        createdAt={comment.createdAt}
        handleReaction={() => handleReactionOnComment({ type, postId, commentId, replyId })}
        handleReply={handleReplyCredentials}
      />
    </div>
  );
}

export default Comment;

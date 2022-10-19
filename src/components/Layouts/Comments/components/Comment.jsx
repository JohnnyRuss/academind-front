import { useSelector } from 'react-redux';

import { useCommentsQuery } from '../../../../hooks';

import { selectUserId } from '../../../../store/selectors/userSelectors';

import styles from './styles/comment.module.scss';
import { UserIdentifier, Tags } from '../../';
import { PinIcon } from '../../Icons/icons';
import { CommentContent, CommentActions } from './';

/**
 * This component represents the comment body, like user identifier, comment text, timeAgo text and action buttons-: like and reply. After all this component is used by "CommentListItem" as well as "RepliesThread" so this is the crossroad to access actions like options, reactions and reply for parent comment as well as for comment from replies thread.
 * @param {string} type "Parent"||"Reply" must to be passed based on component which renders "Comment", tries to represent the comment from main thread or comment from replies thread. Based on type into the coresponding commentReducer function will be passed coressponding information. After all this prop helps useCommentQuery to define which kind of function to execute, forexample send like for Parent or for Reply
 * @param {Object} data object which contains individual comment object, postId and if it comes from replies thread even the parentId(parent comment id)
 * @param {function} handlers object which contains functions: setCommentReply and setUpdateComment
 * @returns
 */
function Comment({ type, data, handlers, className }) {
  const { comment, postId, postAuthorId, parentId } = data;

  const { handleReactionOnComment, handlePinComment, handleDeleteComment } = useCommentsQuery();

  const commentId = type === 'Parent' ? comment._id : parentId;
  const replyId = type === 'Reply' ? comment._id : '';

  const { id } = useSelector(selectUserId);
  function handleReplyCredentials() {
    handlers.setCommentReply({
      commentId,
      tag:
        comment.author._id !== id
          ? { _id: comment.author._id, userName: comment.author.userName }
          : null,
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
    <div className={`${styles.comment} ${className || ''}`} id={comment._id}>
      <div className={styles.commentHeader}>
        <UserIdentifier
          userId={comment.author?._id}
          userName={comment.author?.userName}
          img={comment.author?.profileImg}
          withTime={false}
          className={styles.commentUserIdentifier}>
          {comment.tags[0] && <Tags tags={comment.tags} keyWord='to' />}
        </UserIdentifier>
        {comment.pin && <PinIcon className={styles.pinIcon} />}
      </div>
      <CommentContent
        text={comment.text}
        likesCount={comment.likesAmount}
        postAuthorId={postAuthorId}
        commentAuthorId={comment.author._id}
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

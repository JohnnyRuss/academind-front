/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { useComments } from '../../../../hooks';
import { Comment, RepliesThread } from './';

/**
 * This component is individual for each comment which belongs to comments main thread. It renders his own replies thread if comment from main thread has replies.
 * @param {object} param.comment object of individual comment
 * @param {object} param.setUpdateParentComment is passed to the parent comment and in passing by this component it sets parent comment credentials to the comments reducer
 * @param {string} param.postId id of post which one comment belongs
 */
function CommentListItem({
  comment,
  setUpdateParentComment,
  postId,
  postAuthorId,
  notifyOnComment,
}) {
  const {
    state,
    setTag,
    removeTag,
    setCommentReply,
    setUpdateComment,
    handleShowReplies,
    resetCommentCredentials,
  } = useComments();

  const [scrollToComment, setScrollToComment] = useState(false);

  useEffect(() => {
    if (!notifyOnComment || notifyOnComment.commentId !== comment._id) return;
    handleShowReplies();
    setScrollToComment(true);
  }, []);

  useEffect(() => {
    if (!scrollToComment) return;

    document
      .getElementById(notifyOnComment.replyId)
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });

    setScrollToComment(false);
  }, [scrollToComment]);

  return (
    <>
      <Comment
        type='Parent'
        handlers={{ setCommentReply, setUpdateComment: setUpdateParentComment }}
        data={{ comment, postId, postAuthorId }}
      />
      {comment?.replies && (
        <RepliesThread
          state={state}
          data={{
            postId,
            postAuthorId,
            parentId: comment._id,
            authorId: comment.author._id,
            authorName: comment.author.userName,
            replies: comment.replies,
            repliesAmount: comment.repliesAmount,
          }}
          handlers={{
            handleShowReplies,
            setTag,
            removeTag,
            resetCommentCredentials,
            setUpdateComment,
          }}
        />
      )}
    </>
  );
}

export default CommentListItem;

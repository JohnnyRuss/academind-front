import { useComments } from '../../../../hooks';
import { Comment, RepliesThread } from './';

function CommentListItem({ comment, setUpdateParentComment, postId }) {
  const {
    state,
    setTag,
    removeTag,
    setCommentReply,
    setUpdateComment,
    handleShowReplies,
    resetCommentCredentials,
  } = useComments();

  return (
    <>
      <Comment
        type='Parent'
        handlers={{ setCommentReply, setUpdateComment: setUpdateParentComment }}
        data={{ comment, postId }}
      />
      {comment?.replies && (
        <RepliesThread
          state={state}
          data={{
            postId,
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

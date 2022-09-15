import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectPostCommentsById } from '../../../store/selectors/postSelectors';

import { useCommentPin, useComments, useCommentsQuery } from '../../../hooks';

import styles from './components/styles/commentsList.module.scss';
import { TextAreaWithTag } from '../';
import { CommentListItem } from './components';

function CommentsList({ postId }) {
  const data = useSelector((state) => selectPostCommentsById(state, postId));

  const comments = useCommentPin(data || []);

  const {
    state,
    resetCommentCredentials,
    setTag,
    removeTag,
    setUpdateComment: setUpdateParentComment,
  } = useComments();

  const { handleGetPostComments, handleSubmitComment } = useCommentsQuery(
    'MAIN_THREAD',
    { postId, commentId: state.commentId, text: state.text },
    { updateParent: state.updateParent, resetHandler: resetCommentCredentials }
  );

  useEffect(() => {
    if (data) return;
    handleGetPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.commentsList}>
      {comments?.map((comment) => (
        // each comment is individual element which renders his own comment replies if it has
        <CommentListItem
          comment={comment}
          setUpdateParentComment={setUpdateParentComment}
          postId={postId}
          key={comment._id}
        />
      ))}
      {/* main textfield which is fixed on the bottom */}
      <TextAreaWithTag
        tags={state.tags}
        setTag={setTag}
        removeTag={removeTag}
        handler={handleSubmitComment}
        defaultValue={state.updateParent ? state.text : ''}
        className={styles.commentTextArea}
        placeholder='write your comment...'
      />
    </div>
  );
}

export default CommentsList;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectPostCommentsById } from '../../../store/selectors/postSelectors';
import { useCommentPin, useComments, useCommentsQuery } from '../../../hooks';

import styles from './components/styles/commentsList.module.scss';
import { TextAreaWithTag } from '../';
import { InlineSpinner } from '../../Interface';
import { CommentListItem } from './components';

/**
 * Comments main thread
 * @param {string} param.postId
 */
function CommentsList({ postId, postAuthorId, commentsAmount }) {
  const data = useSelector((state) => selectPostCommentsById(state, postId));
  const { loading } = useSelector(({ commentsData }) => commentsData.getCommentsLoadingState);

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
    if (data || commentsAmount === 0) return;
    handleGetPostComments();
  }, []);

  return (
    <div className={styles.commentsList}>
      {loading && <InlineSpinner />}
      {comments?.map((comment) => (
        <CommentListItem
          comment={comment}
          setUpdateParentComment={setUpdateParentComment}
          postId={postId}
          postAuthorId={postAuthorId}
          key={comment._id}
        />
      ))}
      {/* main textfield which is fixed on the bottom */}
      <TextAreaWithTag
        text={''}
        setText={''}
        defaultValue={state.updateParent ? state.text : ''}
        tags={state.tags}
        setTag={setTag}
        removeTag={removeTag}
        handler={handleSubmitComment}
        placeholder='write your comment...'
        className={styles.commentTextArea}
      />
    </div>
  );
}

export default CommentsList;

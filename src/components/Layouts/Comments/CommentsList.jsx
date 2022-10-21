/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectPostCommentsById } from '../../../store/selectors/postSelectors';
import {
  useCommentPin,
  useComments,
  useCommentsQuery,
  useScrollOnNotifyAtComment,
} from '../../../hooks';

import styles from './components/styles/commentsList.module.scss';
import { TextAreaWithTag } from '../';
import { InlineSpinner } from '../../Interface';
import { CommentListItem } from './components';

function CommentsList({ postId, postAuthorId, commentsAmount, notifyOnComment }) {
  const { loading } = useSelector(({ commentsData }) => commentsData.getCommentsLoadingState);

  const data = useSelector((state) => selectPostCommentsById(state, postId));
  // Sorts comments data by "Pin" property
  const comments = useCommentPin(data || []);

  const [text, setText] = useState('');

  const {
    state,
    resetCommentCredentials,
    setTag,
    removeTag,
    setUpdateComment: setUpdateParentComment,
  } = useComments();

  function reseter() {
    setText('');
    resetCommentCredentials();
  }

  const { handleGetPostComments, handleSubmitComment } = useCommentsQuery(
    'MAIN_THREAD',
    { postId, commentId: state.commentId, text, tags: state.tags },
    { updateParent: state.updateParent, resetHandler: reseter }
  );

  useEffect(() => {
    if (data || commentsAmount === 0) return;
    handleGetPostComments();
  }, []);

  useScrollOnNotifyAtComment({ notifyOnComment });

  return (
    <div className={styles.commentsList}>
      {loading && <InlineSpinner />}
      {comments?.map((comment) => (
        <CommentListItem
          comment={comment}
          setUpdateParentComment={setUpdateParentComment}
          postId={postId}
          postAuthorId={postAuthorId}
          notifyOnComment={notifyOnComment?.replyId ? notifyOnComment : null}
          key={comment._id}
        />
      ))}
      {/* main textfield which is fixed on the bottom */}
      <TextAreaWithTag
        text={text}
        setText={setText}
        tags={state.tags}
        setTag={setTag}
        removeTag={removeTag}
        submitHandler={handleSubmitComment}
        defaultValue={state.updateParent ? state.text : ''}
        placeholder='write your comment...'
        className={styles.commentTextArea}
      />
    </div>
  );
}

export default CommentsList;

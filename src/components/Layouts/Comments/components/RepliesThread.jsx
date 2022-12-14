import { useState } from 'react';
import { useCommentPin, useCommentsQuery } from '../../../../hooks';

import styles from './styles/repliesThread.module.scss';
import { TextAreaWithTag } from '../..';
import { Comment, ShowRepliesBTN } from '.';

function RepliesThread({ state, data, handlers }) {
  const {
    handleShowReplies,
    setCommentReply,
    setTag,
    removeTag,
    resetCommentCredentials,
    setUpdateComment,
  } = handlers;

  const { postId, parentId, authorId, postAuthorId, authorName, replies, repliesAmount } = data;

  const { activeReply, updateReply, showReplies, tags, text: updateText, parentAuthor } = state;

  const [text, setText] = useState('');

  function reseter() {
    setText('');
    resetCommentCredentials();
  }

  const { handleSubmitComment } = useCommentsQuery(
    'REPLIES_THREAD',
    {
      postId: postId,
      commentId: parentId,
      adressatId: tags || [{ authorId: authorId, adressatName: authorName }],
      replyId: state.replyId,
      parentAuthor,
      text,
      tags,
    },
    { updateReply, activeReply, resetHandler: reseter }
  );

  const commentReplies = useCommentPin(replies);

  return (
    <>
      <ShowRepliesBTN
        conditions={{ showReplies, activeReply, updateReply }}
        data={{ adressatId: authorId, adressatName: authorName, replies, repliesAmount }}
        handleShowReplies={handleShowReplies}
      />
      {(showReplies || activeReply || updateReply) && (
        <div className={styles.nestedList}>
          {commentReplies?.map((reply) => (
            <Comment
              type='Reply'
              data={{ postId, comment: reply, parentId, postAuthorId }}
              handlers={{ setCommentReply, setUpdateComment }}
              className={styles.nestedComment}
              key={reply._id}
            />
          ))}
          <TextAreaWithTag
            text={text}
            setText={setText}
            tags={tags}
            setTag={setTag}
            removeTag={(adressatId) => removeTag(adressatId)}
            defaultValue={updateReply ? updateText : ''}
            focus={activeReply}
            submitHandler={handleSubmitComment}
            placeholder='write your comment reply...'
            className={styles.commentRepliesTextArea}
          />
        </div>
      )}
    </>
  );
}

export default RepliesThread;

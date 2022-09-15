import { useCommentPin, useCommentsQuery } from '../../../../hooks';

import styles from './styles/repliesThread.module.scss';
import { TextAreaWithTag } from '../..';
import { Comment, ShowRepliesBTN } from '.';

/**
 * renders comment replies with nested textarea, and show replies button
 * @param {[Object]} replies array of comment replies
 * @param {Boolean} createReply opens comment replies and autofocus texarea
 * @param {function} setCreateReply is passed to work in tandem with show replies to correctly close and open replies
 * @returns
 */
function RepliesThread({ state, data, handlers }) {
  const {
    handleShowReplies,
    setCommentReply,
    setTag,
    removeTag,
    resetCommentCredentials,
    setUpdateComment,
  } = handlers;

  const { postId, parentId, authorId, authorName, replies, repliesAmount } = data;

  const { activeReply, updateReply, showReplies, tags, text, parentAuthor } = state;

  const { handleSubmitComment } = useCommentsQuery(
    'REPLIES_THREAD',
    {
      postId: postId,
      commentId: parentId,
      adressatId: tags || [{ authorId: authorId, adressatName: authorName }],
      replyId: state.replyId,
      parentAuthor,
    },
    { updateReply, activeReply, resetHandler: resetCommentCredentials }
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
              data={{ postId, comment: reply, parentId }}
              handlers={{ setCommentReply, setUpdateComment }}
              className={styles.nestedComment}
              key={reply._id}
            />
          ))}
          <TextAreaWithTag
            handler={handleSubmitComment}
            tags={tags}
            defaultValue={updateReply ? text : ''}
            focus={activeReply}
            setTag={setTag}
            removeTag={(adressatId) => removeTag(adressatId)}
            placeholder='write your comment reply...'
            className={styles.commentRepliesTextArea}
          />
        </div>
      )}
    </>
  );
}

export default RepliesThread;

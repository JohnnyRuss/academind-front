/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  useCommentPin,
  useComments,
  useCommentsQuery,
  useScrollOnNotifyAtComment,
} from "../../../hooks";
import {
  selectPostCommentsById,
  selectCommentsLoadingState,
} from "../../../store/selectors/commentsSelector";

import styles from "./components/styles/commentsList.module.scss";
import { TextAreaWithTag, BlockSpinner, Error } from "../";
import { CommentListItem } from "./components";

function CommentsList({ postId, postAuthorId, notifyOnComment }) {
  const { loading, error, message, target, task } = useSelector(
    selectCommentsLoadingState
  );

  const data = useSelector((state) => selectPostCommentsById(state, postId));

  // Sorts comments data by "Pin" property
  const comments = useCommentPin(data || []);

  const [text, setText] = useState("");

  const {
    state,
    resetCommentCredentials,
    setTag,
    removeTag,
    setUpdateComment: setUpdateParentComment,
  } = useComments();

  function reseter() {
    setText("");
    resetCommentCredentials();
  }

  const { getPostCommentsQuery, submitCommentQuery } = useCommentsQuery(
    "MAIN_THREAD",
    { postId, commentId: state.commentId, text, tags: state.tags },
    { updateParent: state.updateParent, resetHandler: reseter }
  );

  useEffect(() => {
    getPostCommentsQuery();
  }, []);

  useScrollOnNotifyAtComment({ notifyOnComment });

  return (
    <div className={styles.commentsList}>
      {loading && <BlockSpinner />}
      {!loading &&
        (!error || (error && target !== "global")) &&
        comments?.map((comment) => (
          <CommentListItem
            comment={comment}
            setUpdateParentComment={setUpdateParentComment}
            postId={postId}
            postAuthorId={postAuthorId}
            notifyOnComment={notifyOnComment?.replyId ? notifyOnComment : null}
            key={comment._id}
          />
        ))}
      {!loading && !error && !comments[0] && (
        <p className={styles.commentsMessage}>there are no comments yet</p>
      )}
      {error && target === "global" && task === "get" && (
        <Error msg={message} />
      )}
      {error && target === "parent" && (task === "add" || task === "update") && (
        <Error msg={message} />
      )}
      <TextAreaWithTag
        text={text}
        setText={setText}
        tags={state.tags}
        setTag={setTag}
        removeTag={removeTag}
        submitHandler={submitCommentQuery}
        defaultValue={state.updateParent ? state.text : ""}
        placeholder="write your comment..."
        className={styles.commentTextArea}
      />
    </div>
  );
}

export default CommentsList;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useRedirectedPostQuery } from "../../hooks";

import styles from "./post.module.scss";
import {
  selectPosts,
  selectPostsLoadingState,
} from "../../store/selectors/postSelectors";

import {
  Post as SinglePost,
  StandSpinner,
  Error,
} from "../../components/Layouts";

function Post() {
  const { id } = useParams();
  const { state: pathState } = useLocation();

  const { posts } = useSelector(selectPosts);
  const { loading, error, message } = useSelector(selectPostsLoadingState);

  const { getPostQuery, resetState, handleResetPostError } =
    useRedirectedPostQuery();

  useEffect(() => {
    getPostQuery(id);
    return () => resetState();
  }, []);

  return (
    <div className={styles.singlePost}>
      {loading && <StandSpinner />}
      {!loading && !error && posts[0] && (
        <SinglePost
          data={posts[0]}
          notifyOnComment={pathState?.commentId ? pathState : null}
        />
      )}
      {error && (
        <Error asModal={true} msg={message} onClose={handleResetPostError} />
      )}
    </div>
  );
}

export default Post;

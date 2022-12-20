/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import styles from "./post.module.scss";
import {
  selectPosts,
  selectPostsLoadingState,
} from "../../store/selectors/postSelectors";
import { getPost, resetPosts } from "../../store/reducers/postsDataReducer";

import {
  Post as SinglePost,
  DeletedPost,
  StandSpinner,
} from "../../components/Layouts";

function Post() {
  const { id } = useParams();
  const { state: pathState } = useLocation();

  const dispatch = useDispatch();
  const { posts } = useSelector(selectPosts);
  const { loading, error } = useSelector(selectPostsLoadingState);

  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(resetPosts());
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
      {error && <DeletedPost showOptions={false} />}
    </div>
  );
}

export default Post;

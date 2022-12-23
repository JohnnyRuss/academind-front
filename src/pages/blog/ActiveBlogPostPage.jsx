/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useBlogQuery, useCommentsQuery } from "../../hooks";
import { selectPostsLoadingState } from "../../store/selectors/postSelectors";

import { ActiveBlogPost } from "../../components/BlogPage";
import { StandSpinner, Error } from "../../components/Layouts";

function ActiveBlogPostPage() {
  const { id } = useParams();

  const { loading, error, message, task } = useSelector(
    selectPostsLoadingState
  );

  const { handleResetComments } = useCommentsQuery();
  const {
    getRelatedPostsQuery,
    getPostQuery,
    handleResetPosts,
    handleResetPostError,
  } = useBlogQuery();

  useEffect(() => {
    getPostQuery({ postId: id });
    getRelatedPostsQuery({ postId: id });

    return () => {
      handleResetPosts();
      handleResetComments();
    };
  }, []);

  return (
    <>
      {loading && <StandSpinner />}
      {!loading && (!error || (error && task !== "get")) && <ActiveBlogPost />}
      {error && task === "get" && (
        <Error asModal={true} msg={message} onClose={handleResetPostError} />
      )}
    </>
  );
}

export default ActiveBlogPostPage;

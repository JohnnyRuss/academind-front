/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useBlogQuery, useCommentsQuery } from "../../hooks";
import { selectPostsLoadingState } from "../../store/selectors/postSelectors";

import { ActiveBlogPost } from "../../components/BlogPage";
import { StandSpinner } from "../../components/Layouts";

function ActiveBlogPostPage() {
  const { id } = useParams();

  const { loading } = useSelector(selectPostsLoadingState);

  const { handleResetComments } = useCommentsQuery();
  const { getRelatedPostsQuery, getPostQuery, handleResetPosts } =
    useBlogQuery();

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
      <ActiveBlogPost />;
    </>
  );
}

export default ActiveBlogPostPage;

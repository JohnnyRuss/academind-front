/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  selectPosts,
  selectPostsLoadingState,
} from "../../store/selectors/postSelectors";

import { Blog } from "../../components/BlogPage";

import { useBlogQuery } from "../../hooks";

function BlogPage() {
  const { state } = useLocation();

  const { posts, hasMore } = useSelector(selectPosts);
  const { loading } = useSelector(selectPostsLoadingState);

  const {
    getBlogPostsQuery,
    getTopRatedPublishersAndPostsQuery,
    handleResetPosts,
  } = useBlogQuery();

  const [page, setPage] = useState(1);
  async function handleNext() {
    getBlogPostsQuery({
      page: page + 1,
      hasMore: true,
      pathState: state,
    });

    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    getBlogPostsQuery({
      hasMore: false,
      pathState: state,
      manualLoading: true,
    });

    getTopRatedPublishersAndPostsQuery();

    return () => handleResetPosts();
  }, []);

  const [afterMount, setAfterMount] = useState(false);
  useEffect(() => {
    if (afterMount) {
      getBlogPostsQuery({
        hasMore: false,
        pathState: state,
      });
    }

    setAfterMount(true);
  }, [state]);

  return (
    <Blog
      posts={posts}
      loading={loading}
      hasMore={hasMore}
      handleNext={handleNext}
    />
  );
}

export default BlogPage;

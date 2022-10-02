/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getBlogPosts,
  startLoading,
  getTopRatedBlogPosts,
  getTopRatedPublishers,
} from '../../store/reducers/postsDataReducer';
import { resetPosts } from '../../store/reducers/postsDataReducer';
import { selectPosts } from '../../store/selectors/postSelectors';

import {
  BLOG_POSTS_COUNT_PER_REQ,
  BLOG_POSTS_TOP_RATED_PUBLISHERS_COUNT,
  BLOG_POSTS_TOP_RATED_POSTS_COUNT,
} from '../../lib/config';

import { Blog } from '../../components/BlogPage';

function BlogPage() {
  const dispatch = useDispatch();

  const { posts, hasMore } = useSelector(selectPosts);
  const {
    loadingState: { loading },
  } = useSelector(({ postsData }) => postsData);

  const [page, setPage] = useState(1);
  async function handleNext() {
    dispatch(getBlogPosts({ page: page + 1, limit: BLOG_POSTS_COUNT_PER_REQ, hasMore: true }));
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getBlogPosts({ page: 1, limit: BLOG_POSTS_COUNT_PER_REQ, hasMore: false }));
    dispatch(getTopRatedPublishers(BLOG_POSTS_TOP_RATED_PUBLISHERS_COUNT));
    dispatch(getTopRatedBlogPosts(BLOG_POSTS_TOP_RATED_POSTS_COUNT));
    return () => dispatch(resetPosts());
  }, []);

  return <Blog posts={posts} loading={loading} hasMore={hasMore} handleNext={handleNext} />;
}

export default BlogPage;

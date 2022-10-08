/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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
  const { state } = useLocation();

  const { posts, hasMore } = useSelector(selectPosts);
  const {
    loadingState: { loading },
  } = useSelector(({ postsData }) => postsData);

  const [page, setPage] = useState(1);
  async function handleNext() {
    const query = controllQuery(state);
    dispatch(
      getBlogPosts({ page: page + 1, limit: BLOG_POSTS_COUNT_PER_REQ, hasMore: true, query })
    );
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    const query = controllQuery(state);
    dispatch(startLoading());
    dispatch(getBlogPosts({ page: 1, limit: BLOG_POSTS_COUNT_PER_REQ, hasMore: false, query }));
    dispatch(getTopRatedPublishers(BLOG_POSTS_TOP_RATED_PUBLISHERS_COUNT));
    dispatch(getTopRatedBlogPosts(BLOG_POSTS_TOP_RATED_POSTS_COUNT));
    return () => dispatch(resetPosts());
  }, []);

  const [afterMount, setAfterMount] = useState(false);
  useEffect(() => {
    if (afterMount) {
      const query = controllQuery(state);
      dispatch(getBlogPosts({ page: 1, limit: BLOG_POSTS_COUNT_PER_REQ, hasMore: false, query }));
    }
    setAfterMount(true);
  }, [state]);

  return <Blog posts={posts} loading={loading} hasMore={hasMore} handleNext={handleNext} />;
}

export default BlogPage;

function controllQuery(pathStates) {
  const author = pathStates?.author;
  const category = pathStates?.category;

  return `${author ? `&author=${author}` : ''}${
    category?.[0] ? `&category=${category.join(',')}` : ''
  }`;
}

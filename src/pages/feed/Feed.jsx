/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFeedPosts, startLoading } from '../../store/reducers/userReducer';
import { resetPosts } from '../../store/reducers/postsDataReducer';
import { selectPosts } from '../../store/selectors/postSelectors';
import { selectUserId } from '../../store/selectors/userSelectors';

import { FEED_POSTS_COUNT_PER_REQ } from '../../lib/config';

import {
  FeedContainer,
  FeedContent,
  FeedSideBarRight,
  FeedSideBarLeft,
} from '../../components/Feed';
// import { SideBar as SideBarLeft } from '../../components/Layouts';
import { StandSpinner } from '../../components/Interface';

function Feed() {
  const dispatch = useDispatch();

  const { loading } = useSelector(({ user }) => user.loadingState);
  const { posts, hasMore } = useSelector(selectPosts);

  const [page, setPage] = useState(1);
  async function handleNext() {
    dispatch(getFeedPosts({ id, page: page + 1, limit: FEED_POSTS_COUNT_PER_REQ, hasMore: true }));
    setPage((prev) => (prev += 1));
  }

  const { id } = useSelector(selectUserId);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getFeedPosts({ id, page: 1, limit: FEED_POSTS_COUNT_PER_REQ, hasMore: false }));
    return () => dispatch(resetPosts());
  }, []);

  if (loading) return <StandSpinner />;

  return (
    <FeedContainer>
      {/* <SideBarLeft /> */}
      <FeedSideBarLeft />
      <FeedContent hasMore={hasMore} handleNext={handleNext} posts={posts} />
      <FeedSideBarRight />
    </FeedContainer>
  );
}

export default Feed;

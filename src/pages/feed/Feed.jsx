/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFeedPosts, startLoading } from "../../store/reducers/userReducer";
import { resetPosts } from "../../store/reducers/postsDataReducer";
import { resetComments } from "../../store/reducers/commentsDataReducer";
import { selectPosts } from "../../store/selectors/postSelectors";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { selectUserLoadingState } from "../../store/selectors/userSelectors";

import { FEED_POSTS_COUNT_PER_REQ } from "../../lib/config";

import {
  FeedContainer,
  FeedContent,
  FeedSideBarRight,
  FeedSideBarLeft,
} from "../../components/Feed";
import { StandSpinner } from "../../components/Layouts";

function Feed() {
  const dispatch = useDispatch();

  const { loading } = useSelector(selectUserLoadingState);
  const { posts, hasMore } = useSelector(selectPosts);

  const [page, setPage] = useState(1);
  async function handleNext() {
    dispatch(
      getFeedPosts({
        id: activeUserId,
        page: page + 1,
        limit: FEED_POSTS_COUNT_PER_REQ,
        hasMore: true,
      })
    );
    setPage((prev) => (prev += 1));
  }

  const activeUserId = useSelector(selectActiveUserId);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(
      getFeedPosts({
        id: activeUserId,
        page: 1,
        limit: FEED_POSTS_COUNT_PER_REQ,
        hasMore: false,
      })
    );

    return () => {
      dispatch(resetPosts());
      dispatch(resetComments());
    };
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

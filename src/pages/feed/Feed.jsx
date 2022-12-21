/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectPosts } from "../../store/selectors/postSelectors";
import { selectUserLoadingState } from "../../store/selectors/userSelectors";
import { useFeedQuery } from "../../hooks";

import {
  FeedContainer,
  FeedContent,
  FeedSideBarRight,
  FeedSideBarLeft,
} from "../../components/Feed";
import { StandSpinner } from "../../components/Layouts";

function Feed() {
  const { loading } = useSelector(selectUserLoadingState);
  const { posts, hasMore } = useSelector(selectPosts);
  const { getFeedPostsQuery, resetState } = useFeedQuery();

  const [page, setPage] = useState(1);
  async function handleNext() {
    getFeedPostsQuery({ page: page + 1, hasMore: true });
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    getFeedPostsQuery({ manualLoading: true });

    return () => resetState();
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

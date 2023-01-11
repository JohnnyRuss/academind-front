/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectPosts,
  selectPostsLoadingState,
} from "../../store/selectors/postSelectors";
import { useFeedQuery } from "../../hooks";

import {
  FeedContainer,
  FeedContent,
  FeedSideBarRight,
  FeedSideBarLeft,
} from "../../components/Feed";
import { StandSpinner, Error } from "../../components/Layouts";

function Feed() {
  const { loading, error, message } = useSelector(selectPostsLoadingState);
  const { posts, hasMore } = useSelector(selectPosts);
  const { getFeedPostsQuery, resetState, handleResetFeedError } =
    useFeedQuery();

  const [page, setPage] = useState(1);
  async function handleNext() {
    getFeedPostsQuery({ page: page + 1, hasMore: true });
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    getFeedPostsQuery({});

    return () => resetState();
  }, []);

  return (
    <FeedContainer>
      {loading && <StandSpinner />}
      {!loading && !error && (
        <>
          <FeedSideBarLeft />
          <FeedContent
            hasMore={hasMore}
            handleNext={handleNext}
            posts={posts}
          />
          <FeedSideBarRight />
        </>
      )}
      {error && (
        <Error asModal={true} msg={message} onClose={handleResetFeedError} />
      )}
    </FeedContainer>
  );
}

export default Feed;

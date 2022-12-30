/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useProfileReviewQuery } from "../../../hooks";
import { selectPendingPostsLoadingState } from "../../../store/selectors/activeUserSelectors";
import { selectPosts } from "../../../store/selectors/postSelectors";

import {
  Spinner,
  Error,
  EmptyContentMessage,
} from "../../../components/Layouts";
import ProfileReviewTaggedPosts from "../../../components/ProfileReview/ProfileReviewTaggedPosts";

function ReviewTaggedPosts() {
  const { posts } = useSelector(selectPosts);

  const { loading, error, message } = useSelector(
    selectPendingPostsLoadingState
  );

  const { getPendingPostsQuery, resetState } = useProfileReviewQuery();

  useEffect(() => {
    getPendingPostsQuery();
    return () => resetState();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && <ProfileReviewTaggedPosts />}
      {error && <Error msg={message} />}
      {!loading && !error && !posts[0] && (
        <EmptyContentMessage message="there are no pending posts" />
      )}
    </>
  );
}

export default ReviewTaggedPosts;

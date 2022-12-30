/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useRestrictPrivateRoute, useProfileReviewQuery } from "../../../hooks";
import { selectPendingPostsLoadingState } from "../../../store/selectors/activeUserSelectors";
import { selectPosts } from "../../../store/selectors/postSelectors";

import {
  Spinner,
  Error,
  EmptyContentMessage,
} from "../../../components/Layouts";
import ProfileReviewHiddenPosts from "../../../components/ProfileReview/ProfileReviewHiddenPosts";

function ReviewHiddenPosts() {
  useRestrictPrivateRoute();

  const { posts } = useSelector(selectPosts);

  const { loading, error, message } = useSelector(
    selectPendingPostsLoadingState
  );

  const { getHiddenPostsQuery, resetState } = useProfileReviewQuery();

  useEffect(() => {
    getHiddenPostsQuery();
    return () => resetState();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && <ProfileReviewHiddenPosts />}
      {error && <Error msg={message} />}
      {!loading && !error && !posts[0] && (
        <EmptyContentMessage message="there are no hidden posts" />
      )}
    </>
  );
}

export default ReviewHiddenPosts;

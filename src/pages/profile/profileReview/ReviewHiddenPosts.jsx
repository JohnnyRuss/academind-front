/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useRestrictPrivateRoute, useProfileReviewQuery } from "../../../hooks";
import { selectPendingPostsLoadingState } from "../../../store/selectors/activeUserSelectors";

import { Spinner, Error } from "../../../components/Layouts";
import ProfileReviewHiddenPosts from "../../../components/ProfileReview/ProfileReviewHiddenPosts";

function ReviewHiddenPosts() {
  useRestrictPrivateRoute();

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
    </>
  );
}

export default ReviewHiddenPosts;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useRestrictPrivateRoute, useProfileReviewQuery } from "../../../hooks";
import { selectPendingPostsLoadingState } from "../../../store/selectors/activeUserSelectors";

import { Spinner } from "../../../components/Layouts";
import ProfileReviewTaggedPosts from "../../../components/ProfileReview/ProfileReviewTaggedPosts";

function ReviewTaggedPosts() {
  useRestrictPrivateRoute();

  const { loading } = useSelector(selectPendingPostsLoadingState);

  const { getPendingPostsQuery, resetState } = useProfileReviewQuery();

  useEffect(() => {
    getPendingPostsQuery();
    return () => resetState();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <ProfileReviewTaggedPosts />}
    </>
  );
}

export default ReviewTaggedPosts;

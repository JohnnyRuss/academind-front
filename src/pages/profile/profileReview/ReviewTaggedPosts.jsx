/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRestrictPrivateRoute } from "../../../hooks";
import { selectPendingPostsLoadingState } from "../../../store/selectors/activeUserSelectors";

import { getPendingPosts } from "../../../store/reducers/activeUserReducer";
import { resetPosts } from "../../../store/reducers/postsDataReducer";
import { resetComments } from "../../../store/reducers/commentsDataReducer";
import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";

import { Spinner } from "../../../components/Layouts";
import ProfileReviewTaggedPosts from "../../../components/ProfileReview/ProfileReviewTaggedPosts";

function ReviewTaggedPosts() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);
  const { loading } = useSelector(selectPendingPostsLoadingState);

  useEffect(() => {
    dispatch(getPendingPosts(activeUserId));

    return () => {
      dispatch(resetPosts());
      dispatch(resetComments());
    };
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <ProfileReviewTaggedPosts />}
    </>
  );
}

export default ReviewTaggedPosts;

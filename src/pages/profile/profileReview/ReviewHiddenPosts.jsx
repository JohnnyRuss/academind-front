/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRestrictPrivateRoute } from "../../../hooks";

import { getHiddenPosts } from "../../../store/reducers/activeUserReducer";
import { resetPosts } from "../../../store/reducers/postsDataReducer";
import { resetComments } from "../../../store/reducers/commentsDataReducer";
import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";

import ProfileReviewHiddenPosts from "../../../components/ProfileReview/ProfileReviewHiddenPosts";

function ReviewHiddenPosts() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);

  useEffect(() => {
    dispatch(getHiddenPosts(activeUserId));

    return () => {
      dispatch(resetPosts());
      dispatch(resetComments());
    };
  }, []);

  return <ProfileReviewHiddenPosts />;
}

export default ReviewHiddenPosts;

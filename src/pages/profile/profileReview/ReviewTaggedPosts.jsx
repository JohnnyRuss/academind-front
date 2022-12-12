/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRestrictPrivateRoute } from '../../../hooks';

import { getPendingPosts } from '../../../store/reducers/activeUserReducer';
import { resetPosts } from '../../../store/reducers/postsDataReducer';
import { resetComments } from '../../../store/reducers/commentsDataReducer';
import { selectActiveUserId } from '../../../store/selectors/activeUserSelectors';

import ProfileReviewTaggedPosts from '../../../components/ProfileReview/ProfileReviewTaggedPosts';

function ReviewTaggedPosts() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);

  useEffect(() => {
    dispatch(getPendingPosts(activeUserId));

    return () => {
      dispatch(resetPosts());
      dispatch(resetComments());
    };
  }, []);

  return <ProfileReviewTaggedPosts />;
}

export default ReviewTaggedPosts;

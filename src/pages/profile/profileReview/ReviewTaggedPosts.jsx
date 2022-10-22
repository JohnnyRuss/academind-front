/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRestrictPrivateRoute } from '../../../hooks';

import { getPendingPosts } from '../../../store/reducers/activeUserReducer';
import { resetPosts } from '../../../store/reducers/postsDataReducer';
import { resetComments } from '../../../store/reducers/commentsDataReducer';
import { selectUserId } from '../../../store/selectors/userSelectors';

import ProfileReviewTaggedPosts from '../../../components/ProfileReview/ProfileReviewTaggedPosts';

function ReviewTaggedPosts() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();
  const { id } = useSelector(selectUserId);

  useEffect(() => {
    dispatch(getPendingPosts(id));

    return () => {
      dispatch(resetPosts());
      dispatch(resetComments());
    };
  }, []);

  return <ProfileReviewTaggedPosts />;
}

export default ReviewTaggedPosts;

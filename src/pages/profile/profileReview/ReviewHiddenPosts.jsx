/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRestrictPrivateRoute } from '../../../hooks';

import { getHiddenPosts } from '../../../store/reducers/activeUserReducer';
import { resetPosts } from '../../../store/reducers/postsDataReducer';
import { selectUserId } from '../../../store/selectors/userSelectors';

import ProfileReviewHiddenPosts from '../../../components/ProfileReview/ProfileReviewHiddenPosts';

function ReviewHiddenPosts() {
  useRestrictPrivateRoute();

  const dispatch = useDispatch();
  const { id } = useSelector(selectUserId);

  useEffect(() => {
    dispatch(getHiddenPosts(id));
    return () => dispatch(resetPosts());
  }, []);

  return <ProfileReviewHiddenPosts />;
}

export default ReviewHiddenPosts;

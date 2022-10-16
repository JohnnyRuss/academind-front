/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPendingPosts } from '../../../store/reducers/activeUserReducer';
import { resetPosts } from '../../../store/reducers/postsDataReducer';
import { selectUserId } from '../../../store/selectors/userSelectors';

import ProfileReviewTaggedPosts from '../../../components/ProfileReview/ProfileReviewTaggedPosts';

function ReviewTaggedPosts() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUserId);

  useEffect(() => {
    dispatch(getPendingPosts(id));
    return () => dispatch(resetPosts());
  }, []);

  return <ProfileReviewTaggedPosts />;
}

export default ReviewTaggedPosts;

import { Outlet } from 'react-router-dom';
import ProfileReviewNav from '../../../components/ProfileReview/ProfileReviewNav';
import ProfileReviewContainer from '../../../components/ProfileReview/ProfileReviewContainer';

function ProfileReview() {
  return (
    <ProfileReviewContainer>
      <ProfileReviewNav />
      <Outlet />
    </ProfileReviewContainer>
  );
}

export default ProfileReview;

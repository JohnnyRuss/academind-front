import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserProfile } from '../../store/reducers/userReducer';

import { StandSpinner } from '../Interface';
import UserCover from './components/UserCover';

function Profile() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading } = useSelector(({ user }) => user.loadingState);

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  if (loading) return <StandSpinner />;

  return (
    <>
      <UserCover />
      <Outlet />
    </>
  );
}

export default Profile;

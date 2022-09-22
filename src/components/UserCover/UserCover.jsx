import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { axiosQuery } from '../../store/axiosConfig';
import { useForeignUser } from '../../hooks';
import { getUserProfile } from '../../store/reducers/userReducer';

import styles from './components/styles/userCover.module.scss';
import { StandSpinner } from '../Interface';
import {
  CoverImage,
  ProfileImage,
  UsernameAndEmail,
  FriendShip,
  ProfileNavigation,
} from './components';

function Profile() {
  const dispatch = useDispatch();

  const { isActiveUser, profileId } = useForeignUser('basedOnLocation');
  
  const [friendShip, setFriendShip] = useState(null);

  const { loading } = useSelector(({ user }) => user.loadingState);

  useEffect(() => {
    dispatch(getUserProfile(profileId));
  }, [dispatch, profileId]);

  useEffect(() => {
    async function getFriendShip() {
      const { data } = await axiosQuery(`/user/${profileId}/isFriend`);
      setFriendShip(data);
    }

    if (!isActiveUser) getFriendShip();
  }, [isActiveUser, profileId]);

  if (loading) return <StandSpinner />;

  return (
    <>
      <div className={styles.landscape}>
        <div className={styles.content}>
          <CoverImage />
          <ProfileImage />
          <UsernameAndEmail />
          {!isActiveUser && <FriendShip friendShip={friendShip} />}
          <ProfileNavigation />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Profile;

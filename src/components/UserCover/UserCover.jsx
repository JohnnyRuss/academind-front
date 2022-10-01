import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { axiosQuery } from '../../store/axiosConfig';
import { useForeignUser } from '../../hooks';
import { getUserProfile } from '../../store/reducers/userReducer';

import styles from './components/styles/userCover.module.scss';
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

  return (
    <>
      <div className={styles.landscape}>
        <div className={styles.content}>
          <CoverImage />
          <ProfileImage />
          <UsernameAndEmail />
          {!isActiveUser && (
            <FriendShip
              friendShip={friendShip}
              profileId={profileId}
              setFriendShip={setFriendShip}
            />
          )}
          <ProfileNavigation />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Profile;

{
  /* <Route element={<RestrictionUnAuthorised />}>
<Route path='feed' element={<Feed />} />
<Route path='/profile/*' element={<UserCover />} />
<Route path='/profile/:id/posts' element={<PostsPage />} />
<Route path='/profile/:id/about' element={<About />} />
<Route path='/profile/:id/friends/all-friends' element={<AllFriends />} />
<Route path='/profile/:id/friends/sent-requests' element={<SentRequests />} />
<Route path='/profile/:id/friends/pending-requests' element={<PendingRequests />} />
<Route path='/profile/:id/bookmarks' element={<BookmarksPage />} />
<Route path='blog' element={<Blog />} />
<Route path='blog/:id' element={<ActiveBlogPost />} />
</Route> */
}

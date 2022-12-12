import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForeignUser } from "../../hooks";
import { getUserProfile } from "../../store/reducers/userReducer";
import { selectUserLoadingState } from "../../store/selectors/userSelectors";
import { useHelperQueries } from "../../hooks";

import styles from "./components/styles/userCover.module.scss";
import {
  CoverImage,
  ProfileImage,
  UsernameAndEmail,
  FriendShip,
  ProfileNavigation,
} from "./components";

function Profile() {
  const dispatch = useDispatch();

  const { loading } = useSelector(selectUserLoadingState);

  const { isActiveUser, profileId } = useForeignUser("basedOnLocation");

  const [friendShip, setFriendShip] = useState(null);

  useEffect(() => {
    dispatch(getUserProfile(profileId));
  }, [dispatch, profileId]);

  const { getFriendShip } = useHelperQueries();

  useEffect(() => {
    async function getFriendshipInfo() {
      const data = await getFriendShip(profileId);
      setFriendShip(data);
    }

    if (!isActiveUser) getFriendshipInfo();
  }, [isActiveUser, profileId]);

  return (
    <>
      {!loading && (
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
      )}
      <Outlet />
    </>
  );
}

export default Profile;

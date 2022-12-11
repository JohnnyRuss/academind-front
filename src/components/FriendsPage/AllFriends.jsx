/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useForeignUser, useFriendsQuery } from "../../hooks";
import { selectAllFriendsPageState } from "../../store/selectors/friendsSelector";

import styles from "./components/styles/allFriends.module.scss";
import FriendOptions from "./components/FriendOptions";
import { Image, Spinner, Link } from "../Interface";

function AllFriends() {
  const { isActiveUser, profileId } = useForeignUser("basedOnLocation");

  const { deleteFriendQuery, getAllFriendsQuery } = useFriendsQuery();

  const {
    loadingState: { loading },
    allFriends,
    searchKey,
  } = useSelector(selectAllFriendsPageState);

  useEffect(() => {
    getAllFriendsQuery(profileId);
  }, []);

  return (
    <div className={styles.allFriends}>
      {loading && <Spinner />}
      {!loading &&
        allFriends
          .filter((friend) => {
            if (!searchKey) return friend;
            else return friend.userName.includes(searchKey);
          })
          .map((friend) => (
            <div className={styles.friend} key={friend._id}>
              <Image src={friend.profileImg} className={styles.friendImg} />
              <Link
                path={`/profile/${friend._id}/posts`}
                className={styles.friendName}
              >
                {friend.userName}
              </Link>
              <span className={styles.muntuals}>
                {friend.muntual} muntual friends
              </span>
              {isActiveUser && (
                <FriendOptions
                  deleteFriendHandler={() => deleteFriendQuery(friend._id)}
                />
              )}
            </div>
          ))}
    </div>
  );
}

export default AllFriends;

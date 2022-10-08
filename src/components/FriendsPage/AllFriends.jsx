/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useForeignUser, useFriendsQuery } from '../../hooks';
import { getAllFriends } from '../../store/reducers/friendsReducer';

import styles from './components/styles/allFriends.module.scss';
import FriendOptions from './components/FriendOptions';
import { Image, Spinner, Link } from '../Interface';

function AllFriends() {
  const dispatch = useDispatch();

  const { isActiveUser, profileId } = useForeignUser('basedOnLocation');

  const { deleteFriendHandler } = useFriendsQuery();

  const {
    loadingState: { loading },
    allFriends,
    searchKey,
  } = useSelector(({ friends }) => friends);

  useEffect(() => {
    dispatch(getAllFriends(profileId));
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
              <Link path={`/profile/${friend._id}/posts`} className={styles.friendName}>
                {friend.userName}
              </Link>
              <span className={styles.muntuals}>{friend.muntuals} muntual friends</span>
              {isActiveUser && (
                <FriendOptions deleteFriendHandler={() => deleteFriendHandler(friend._id)} />
              )}
            </div>
          ))}
    </div>
  );
}

export default AllFriends;

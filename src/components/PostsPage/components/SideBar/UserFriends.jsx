import { useSelector } from 'react-redux';

import { selectUserInfo } from '../../../../store/selectors/userSelectors';

import styles from './userFriends.module.scss';
import { Image, Link } from '../../../Interface';

function UserFriends() {
  const { friends } = useSelector(selectUserInfo);
  return (
    <div className={styles.userFriends}>
      <div className={styles.userFriendsIntro}>
        <p className={styles.introTitle}>friends</p>
        <p className={styles.showAll}>show all friends</p>
        <p className={styles.introAmount}>213 friends</p>
      </div>
      <div className={styles.friendsList}>
        {friends?.map((friend) => (
          <div className={styles.friend} key={friend._id}>
            <Image src={friend.profileImg} className={styles.friendImg} />
            <Link path={`/profile/${friend._id}/posts`}>
              <h4 className={styles.friendName}>{friend.userName}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserFriends;

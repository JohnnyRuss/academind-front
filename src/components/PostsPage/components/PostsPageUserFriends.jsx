import { useSelector } from 'react-redux';

import { selectUserInfo } from '../../../store/selectors/userSelectors';

import styles from './styles/postsPageUserFriends.module.scss';
import { Image, Link } from '../../Interface';

function PostsPageUserFriends() {
  const { friends, friendsAmount, _id } = useSelector(selectUserInfo);
  return (
    <div className={styles.postsPageUserFriends}>
      <div className={styles.userFriendsIntro}>
        <p className={styles.introTitle}>friends</p>
        <Link path={`/profile/${_id}/friends/all-friends`} className={styles.showAll}>
          show all friends
        </Link>
        <p className={styles.introAmount}>{friendsAmount} friends</p>
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

export default PostsPageUserFriends;

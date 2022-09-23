/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAllFriends } from '../../store/reducers/friendsReducer';

import styles from './components/allFriends.module.scss';
import { Image, Spinner, Link } from '../Interface';
import { DotsHorizontalIcon } from '../Layouts/Icons/icons';

function AllFriends() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    loadingState: { loading },
    allFriends,
  } = useSelector(({ friends }) => friends);

  useEffect(() => {
    dispatch(getAllFriends(id));
  }, []);

  return (
    <div className={styles.allFriends}>
      {loading && <Spinner />}
      {!loading &&
        allFriends.map(({ friend }) => (
          <div className={styles.friend} key={friend._id}>
            <Image src={friend.profileImg} className={styles.friendImg} />
            <Link path={`/profile/${friend._id}/posts`} className={styles.friendName}>
              {friend.userName}
            </Link>
            <span className={styles.muntuals}>6 muntual friends</span>
            <button className={styles.optBtn}>
              <DotsHorizontalIcon />
            </button>
          </div>
        ))}
    </div>
  );
}

export default AllFriends;

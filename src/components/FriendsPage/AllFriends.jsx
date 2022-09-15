import { uid } from 'uid';

import styles from './components/allFriends.module.scss';
import { Image } from '../Interface';
import { DotsHorizontalIcon } from '../Layouts/Icons/icons';

function AllFriends() {
  return (
    <div className={styles.allFriends}>
      {[1, 2, 3, 4, 1, 2, 3].map((item) => (
        <div className={styles.friend} key={uid(6)}>
          <Image src={`/img/user-${item}.jpg`} className={styles.friendImg} />
          <h4 className={styles.friendName}>friend name</h4>
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

import { useSelector } from 'react-redux';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';

import styles from './styles/navActions.module.scss';
import {
  ThemeIcon,
  UserFriendRequestsIcon,
  MessengerIcon,
  NotificationIcon,
  BurgerIcon,
} from '../../Layouts/Icons/icons';
import { Avatar, Link } from '../../Interface';
import NavSearchBar from './NavSearchBar';

function NavActions({ setActiveNavList }) {
  const { image, id } = useSelector(selectActiveUserInfo);

  return (
    <div className={styles.navActions}>
      <NavSearchBar />
      <label htmlFor='themeCheck' className={styles.themeCheckLabel}>
        <input type='checkBox' id='themeCheck' className={styles.themeCheck} />
        <ThemeIcon />
      </label>
      <button>
        <UserFriendRequestsIcon />
      </button>
      <button>
        <MessengerIcon />
      </button>
      <button>
        <NotificationIcon />
      </button>
      <button className={styles.navBurgerBtn} onClick={() => setActiveNavList((prev) => !prev)}>
        <BurgerIcon />
      </button>
      <Link path={`/profile/${id}/posts`}>
        <Avatar img={image} className={styles.navigationAvatar} />
      </Link>
    </div>
  );
}

export default NavActions;

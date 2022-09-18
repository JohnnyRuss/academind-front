import { useSelector } from 'react-redux';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';

import styles from './styles/navActions.module.scss';
import { NavSearchBar } from './';
import { Avatar, Link } from '../../Interface';
import {
  ThemeIcon,
  UserFriendRequestsIcon,
  MessengerIcon,
  NotificationIcon,
  BurgerIcon,
} from '../../Layouts/Icons/icons';

function NavActions() {
  const { image, id } = useSelector(selectActiveUserInfo);

  return (
    <div className={styles.mainNavActions}>
      <NavSearchBar />
      {/* <label htmlFor='themeCheck'>
        <input type='checkBox' id='themeCheck' className={styles.themeCheck} />
        <ThemeIcon />
      </label> */}
      <button>
        <UserFriendRequestsIcon />
      </button>
      <button>
        <MessengerIcon />
      </button>
      <button>
        <NotificationIcon />
      </button>
      <button className={styles.mainNavActionsBurgerBtn}>
        <BurgerIcon />
      </button>
      <Link path={`/profile/${id}/posts`}>
        <Avatar img={image} />
      </Link>
    </div>
  );
}

export default NavActions;

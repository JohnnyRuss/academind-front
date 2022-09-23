import styles from './styles/navActions.module.scss';
import { NavSearchBar, NavAvatar } from './';
import {
  UserFriendRequestsIcon,
  EmailIcon,
  NotificationIcon,
  BurgerIcon,
} from '../../Layouts/Icons/icons';

function NavActions() {
  return (
    <div className={styles.mainNavActions}>
      <NavSearchBar />
      <button>
        <UserFriendRequestsIcon />
      </button>
      <button>
        <EmailIcon />
      </button>
      <button>
        <NotificationIcon />
      </button>
      <button className={styles.mainNavActionsBurgerBtn}>
        <BurgerIcon />
      </button>
      <NavAvatar />
    </div>
  );
}

export default NavActions;

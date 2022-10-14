import { useDispatch, useSelector } from 'react-redux';

import { setActiveNotifications } from '../../../store/reducers/activeUserReducer';

import styles from './styles/navActions.module.scss';
import { NavSearchBar, NavAvatar } from './';
import {
  UserFriendRequestsIcon,
  EmailIcon,
  NotificationIcon,
  BurgerIcon,
} from '../../Layouts/Icons/icons';

function NavActions() {
  const dispatch = useDispatch();

  const { activeNotifications } = useSelector(({ activeUser }) => activeUser);

  function controllNotifications() {
    dispatch(setActiveNotifications(!activeNotifications));
  }

  return (
    <div className={styles.mainNavActions}>
      <NavSearchBar />
      <button>
        <UserFriendRequestsIcon />
      </button>
      <button>
        <EmailIcon />
      </button>
      <button onClick={controllNotifications}>
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

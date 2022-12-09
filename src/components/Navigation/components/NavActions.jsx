import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectUserId } from "../../../store/selectors/userSelectors";
import { setActiveNotifications } from "../../../store/reducers/activeUserReducer";
import { useBlurOnBody } from "../../../hooks";

import styles from "./styles/navActions.module.scss";
import { NavSearchBar, NavAvatar } from "./";
import {
  UserFriendRequestsIcon,
  EmailIcon,
  NotificationIcon,
  BurgerIcon,
} from "../../Layouts/Icons/icons";

function NavActions() {
  const dispatch = useDispatch();

  const { activeNotifications } = useSelector(({ activeUser }) => activeUser);
  const { id: activeUserId } = useSelector(selectUserId);

  const activateNotifications = () =>
    dispatch(setActiveNotifications(!activeNotifications));

  const deactivateNotifications = () => dispatch(setActiveNotifications(false));

  const { onFocus } = useBlurOnBody(
    activateNotifications,
    deactivateNotifications,
    ["notification--modal", "notification--nav__btn"]
  );

  return (
    <div className={styles.mainNavActions}>
      <NavSearchBar />
      <button>
        <Link to={`/profile/${activeUserId}/friends/pending-requests`}>
          <UserFriendRequestsIcon />
        </Link>
      </button>
      <button>
        <Link to="/messanger">
          <EmailIcon />
        </Link>
      </button>
      <button onClick={onFocus} className="notification--nav__btn">
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

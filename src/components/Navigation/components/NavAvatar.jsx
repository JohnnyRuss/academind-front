import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectActiveUserShortInfo } from "../../../store/selectors/activeUserSelectors";
import { logOut } from "../../../store/reducers/activeUserReducer";
import { useBlurOnBody } from "../../../hooks";

import styles from "./styles/navAvatar.module.scss";

function NavAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { image, _id, userName } = useSelector(selectActiveUserShortInfo);
  const [openAvatar, setOpenAvatar] = useState(false);

  function handleLogOut() {
    dispatch(logOut());
    navigate("/authentication/login");
  }

  const onBlurHandler = () => setOpenAvatar(false);
  const onActiveAvatarHandler = () => setOpenAvatar((prev) => !prev);

  const { onFocus } = useBlurOnBody(onActiveAvatarHandler, onBlurHandler, [
    "user-avatar",
    "avatar-modal--list",
    "avatar--img",
  ]);

  return (
    <div className={styles.navAvatarBox}>
      <figure className={`${styles.avatar} user--avatar`} onClick={onFocus}>
        <img src={image} alt="user avatar" className="avatar--img" />
      </figure>
      {openAvatar && (
        <ul className={`${styles.navAvatarModal} avatar-modal--list`}>
          <li>
            <Link
              to={`/profile/${_id}/posts`}
              onClick={() => setOpenAvatar(false)}
            >
              {userName}
            </Link>
          </li>
          <li>
            <Link to={`/settings`} onClick={() => setOpenAvatar(false)}>
              Settings
            </Link>
          </li>
          <li onClick={handleLogOut}>Logout</li>
        </ul>
      )}
    </div>
  );
}

export default NavAvatar;

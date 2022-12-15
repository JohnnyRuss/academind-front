import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectActiveUserShortInfo } from "../../../store/selectors/activeUserSelectors";
import { logOut } from "../../../store/reducers/activeUserReducer";

import styles from "./styles/navAvatar.module.scss";
import { Avatar } from "../../Layouts";

function NavAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { image, _id, userName } = useSelector(selectActiveUserShortInfo);
  const [openAvatar, setOpenAvatar] = useState(false);

  function handleLogOut() {
    dispatch(logOut());
    navigate("/authentication/login");
    // window.reloa
  }

  return (
    <div className={styles.navAvatarBox}>
      <Avatar img={image} onClick={() => setOpenAvatar((prev) => !prev)} />
      {openAvatar && (
        <ul className={styles.navAvatarModal}>
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectActiveUserInfo } from "../../../store/selectors/userSelectors";
import { logOut } from "../../../store/reducers/activeUserReducer";

import styles from "./styles/navAvatar.module.scss";
import { Avatar, Link } from "../../Interface";

function NavAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { image, id, userName } = useSelector(selectActiveUserInfo);
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
              path={`/profile/${id}/posts`}
              onClick={() => setOpenAvatar(false)}
            >
              {userName}
            </Link>
          </li>
          <li onClick={handleLogOut}>Logout</li>
        </ul>
      )}
    </div>
  );
}

export default NavAvatar;

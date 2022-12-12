import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";

import styles from "./styles/navList.module.scss";

function NavList() {
  const activeUserId = useSelector(selectActiveUserId);

  return (
    <ul className={styles.mainNavList}>
      <Link to="/feed">Feed</Link>
      <Link to={`/profile/${activeUserId}/posts`}>Profile</Link>
      <Link to="/blog">Blog</Link>
    </ul>
  );
}

export default NavList;

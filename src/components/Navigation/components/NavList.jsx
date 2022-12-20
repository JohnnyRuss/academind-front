import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";
import styles from "./styles/navList.module.scss";

function NavList({ activeNav, onBlurHandler }) {
  const activeUserId = useSelector(selectActiveUserId);

  return (
    <ul
      className={`${styles.mainNavList} ${
        activeNav ? styles.activeNav : ""
      } nav--list`}
    >
      <Link to="/feed" onClick={() => onBlurHandler()}>
        Feed
      </Link>
      <Link
        to={`/profile/${activeUserId}/posts`}
        onClick={() => onBlurHandler()}
      >
        Profile
      </Link>
      <Link to="/blog" onClick={() => onBlurHandler()}>
        Blog
      </Link>
    </ul>
  );
}

export default NavList;

import { useDispatch, useSelector } from "react-redux";

import { setNavTarget } from "../../../../store/reducers/aboutReducer";
import { selectAboutNavTarget } from "../../../../store/selectors/aboutPageSelectors";

import styles from "./styles/aboutNav.module.scss";

function AboutNav() {
  const dispatch = useDispatch();
  const navTarget = useSelector(selectAboutNavTarget);

  const handleNav = (e) =>
    dispatch(setNavTarget(e.target.getAttribute("name")));

  return (
    <nav className={styles.aboutNav}>
      <ul className={styles.aboutNavList}>
        <li
          name="basics"
          onClick={handleNav}
          className={`${styles.aboutNavListItem} ${
            navTarget === "basics" ? styles.aboutNavListItemActive : ""
          }`}
        >
          basic info
        </li>
        <li
          name="edu"
          onClick={handleNav}
          className={`${styles.aboutNavListItem} ${
            navTarget === "edu" ? styles.aboutNavListItemActive : ""
          }`}
        >
          education and workplace
        </li>
      </ul>
    </nav>
  );
}

export default AboutNav;

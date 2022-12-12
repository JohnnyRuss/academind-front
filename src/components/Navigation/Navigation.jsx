import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectActiveUser } from "../../store/selectors/activeUserSelectors";

import styles from "./components/styles/navigation.module.scss";
import { NavList, NavActions } from "./components";

function Navigation() {
  const { isAuthenticated } = useSelector(selectActiveUser);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      isAuthenticated &&
      (pathname === "/authentication/login" ||
        pathname === "/authentication/register")
    )
      navigate("/feed");
  }, [pathname, isAuthenticated, navigate]);

  return (
    <div className={styles.mainNav}>
      <div className={styles.mainNavLogo}>A</div>
      {isAuthenticated && (
        <>
          <NavList />
          <NavActions />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Link to="/authentication/login">Login</Link>
          <Link to="/authentication/register">Register</Link>
        </>
      )}
    </div>
  );
}

export default Navigation;

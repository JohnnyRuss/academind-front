/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoContext } from "../../store/Io";

import { selectActiveUser } from "../../store/selectors/activeUserSelectors";
import { useBadgeQuery, useBlurOnBody } from "../../hooks";

import styles from "./components/styles/navigation.module.scss";
import { NavActions, NavList } from "./components";

function Navigation() {
  const { pathname } = useLocation();

  const { socket } = useContext(IoContext);

  const { isAuthenticated } = useSelector(selectActiveUser);

  const {
    encreaseUnseenRequestsCountHandler,
    encreaseUnseenConversationsCountHandler,
    encreaseUnseenNotificationsCountHandler,
  } = useBadgeQuery();

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_new_friend_request", (data) => {
      encreaseUnseenRequestsCountHandler(data);
    });

    socket.on("receive_new_notification", (data) => {
      encreaseUnseenNotificationsCountHandler(data);
    });

    if (!pathname.startsWith("/messanger")) {
      socket.on("receive_new_message", (data) => {
        encreaseUnseenConversationsCountHandler(data);
      });
    }
  }, [socket]);

  const [activeNav, setActiveNav] = useState(false);

  const onBlurHandler = () => setActiveNav(false);
  const onActiveNavHandler = () => setActiveNav((prev) => !prev);

  const { onFocus } = useBlurOnBody(onActiveNavHandler, onBlurHandler, [
    "nav--list",
    "burger--btn",
  ]);

  return (
    <div className={styles.mainNav}>
      <div className={styles.mainNavLogo}>A</div>
      {isAuthenticated && (
        <>
          <NavList activeNav={activeNav} onBlurHandler={onBlurHandler} />
          <NavActions activateNav={onFocus} />
        </>
      )}
      {!isAuthenticated && (
        <>
          {!pathname.endsWith("login") && (
            <Link to="/authentication/login">Login</Link>
          )}
          {!pathname.endsWith("register") && (
            <Link to="/authentication/register">Register</Link>
          )}
        </>
      )}
    </div>
  );
}

export default Navigation;

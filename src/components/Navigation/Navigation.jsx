import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Link } from '../Interface';
import styles from './components/styles/navigation.module.scss';
import { NavList, NavActions } from './components';

function Navigation() {
  const { isAuthenticated } = useSelector(({ activeUser }) => activeUser.user);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuthenticated && pathname === '/') navigate('/feed');
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
          <Link path='/authentication/login'>Login</Link>
          <Link path='/authentication/register'>Register</Link>
        </>
      )}
    </div>
  );
}

export default Navigation;

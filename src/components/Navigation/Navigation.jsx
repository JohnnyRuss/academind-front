import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Link } from '../Interface';
import styles from './components/styles/navigation.module.scss';
import NavList from './components/NavList';
import NavActions from './components/NavActions';

function Navigation() {
  const [activeNavList, setActiveNavList] = useState(false);
  const { isAuthenticated } = useSelector(({ activeUser }) => activeUser.user);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuthenticated && pathname === '/') navigate('/feed');
  }, [pathname, isAuthenticated, navigate]);

  return (
    <div className={styles.navigation}>
      <div className={styles.logo}>A</div>
      {isAuthenticated && (
        <>
          <NavList activeNavList={activeNavList} />
          <NavActions setActiveNavList={setActiveNavList} />
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

import { useLocation } from 'react-router-dom';

import { useScroll } from '../../hooks';

import styles from './components/styles/profileReviewNav.module.scss';
import { Link } from '../Interface';

function ProfileReviewNav() {
  useScroll({ target: 'elem', scrollTo: 'profile-review__page--nav-bar' });

  const { pathname } = useLocation();

  function activeRoute(route) {
    if (pathname.endsWith(route)) return styles.active;
  }

  return (
    <nav className={styles.profileReviewNav} id='profile-review__page--nav-bar'>
      <Link path='tags' className={activeRoute('tags')}>
        tagged posts
      </Link>
      <Link path='hidden' className={activeRoute('hidden')}>
        hidden posts
      </Link>
    </nav>
  );
}

export default ProfileReviewNav;

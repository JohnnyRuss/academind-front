import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './components/styles/profileReviewNav.module.scss';
import { Link } from '../Interface';

function ProfileReviewNav() {
  const { pathname } = useLocation();

  function activeRoute(route) {
    if (pathname.endsWith(route)) return styles.active;
  }

  return (
    <nav className={styles.profileReviewNav}>
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

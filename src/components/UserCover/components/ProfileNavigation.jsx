import { useLocation, useParams, Link } from 'react-router-dom';

import { useForeignUser } from '../../../hooks';

import styles from './styles/profileNavigation.module.scss';

function ProfileNavigation() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const location = pathname.split('/')[3];

  const { isActiveUser } = useForeignUser('basedOnId');

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <Link to={`/profile/${id}/posts`}>
          <li className={location === 'posts' ? styles.active : ''}>posts</li>
        </Link>
        <Link to={`/profile/${id}/about`}>
          <li className={location === 'about' ? styles.active : ''}>about</li>
        </Link>
        <Link to={`/profile/${id}/friends/all-friends`}>
          <li className={location === 'friends' ? styles.active : ''}>friends</li>
        </Link>
        <Link to={`/blog`} state={{ author: id }}>
          <li>blog</li>
        </Link>
        {isActiveUser && (
          <>
            <Link to={`/profile/${id}/bookmarks`}>
              <li className={location === 'bookmarks' ? styles.active : ''}>bookmarks</li>
            </Link>
            <Link to={`/profile/${id}/profile-review/tags`}>
              <li className={location === 'profile-review' ? styles.active : ''}>profile review</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default ProfileNavigation;

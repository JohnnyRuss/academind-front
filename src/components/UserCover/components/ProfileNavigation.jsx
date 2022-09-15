import { useLocation, useParams } from 'react-router-dom';
import { Link } from '../../Interface';
import styles from './profileNavigation.module.scss';

function ProfileNavigation() {
  const { pathname } = useLocation();
  const {id} = useParams()
  const location = pathname.split('/')[3];

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <Link path={`/profile/${id}/posts`}>
          <li className={location === 'posts' ? styles.active : ''}>posts</li>
        </Link>
        <Link path={`/profile/${id}/about`}>
          <li className={location === 'about' ? styles.active : ''}>about</li>
        </Link>
        <Link path={`/profile/${id}/friends/all-friends`}>
          <li className={location === 'friends' ? styles.active : ''}>friends</li>
        </Link>
        <Link path={`/blog?publishBy=${id}`}>
          <li>blog</li>
        </Link>
      </ul>
    </nav>
  );
}

export default ProfileNavigation;

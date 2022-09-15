import { useLocation, useParams } from 'react-router-dom';

import styles from './components/friendsPageNavigation.module.scss';
import { SearchBar } from '../Layouts';
import { Link } from '../Interface';

function Friends() {
  const { pathname } = useLocation();
  const { id } = useParams();

  function activeRoute(route) {
    if (pathname.includes(route)) return styles.active;
  }

  return (
    <nav className={styles.friendsNav}>
      <Link path='all-friends' className={activeRoute('all-friends')}>
        all friends
      </Link>
      <Link path='sent-requests' className={activeRoute('sent-requests')}>
        sent request
      </Link>
      <Link path='pending-requests' className={activeRoute('pending-request')}>
        pending request
      </Link>
      <SearchBar className={styles.friendsSearch} />
    </nav>
  );
}

export default Friends;

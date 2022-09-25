import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchKey } from '../../store/reducers/friendsReducer';
import { useForeignUser } from '../../hooks';

import styles from './components/styles/friendsPageNavigation.module.scss';
import { SearchBar } from '../Layouts';
import { Link } from '../Interface';

function Friends() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  function activeRoute(route) {
    if (pathname.includes(route)) return styles.active;
  }

  const { isActiveUser } = useForeignUser('basedOnId');

  const searchKey = useSelector(({ friends }) => friends.searchKey);
  function handleSearch(e) {
    dispatch(setSearchKey(e.target.value));
  }

  return (
    <nav className={styles.friendsNav}>
      <Link path='all-friends' className={activeRoute('all-friends')}>
        all friends
      </Link>
      {isActiveUser && (
        <>
          <Link path='sent-requests' className={activeRoute('sent-requests')}>
            sent request
          </Link>
          <Link path='pending-requests' className={activeRoute('pending-request')}>
            pending request
          </Link>
        </>
      )}
      <SearchBar onChange={handleSearch} value={searchKey} className={styles.friendsSearch} />
    </nav>
  );
}

export default Friends;

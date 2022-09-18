import { useSelector } from 'react-redux';
import { selectUserId } from '../../../store/selectors/userSelectors';

import { Link } from '../../Interface';
import styles from './styles/navList.module.scss';

function NavList() {
  const { id } = useSelector(selectUserId);

  return (
    <ul className={styles.mainNavList}>
      <Link path='/feed'>Feed</Link>
      <Link path={`/profile/${id}/posts`}>Profile</Link>
      <Link path='/blog'>Blog</Link>
    </ul>
  );
}

export default NavList;

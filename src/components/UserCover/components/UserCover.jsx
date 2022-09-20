import { useSelector } from 'react-redux';

import styles from './styles/userCover.module.scss';
import CoverImage from './CoverImage';
import ProfileImage from './ProfileImage';
import UsernameAndEmail from './UsernameAndEmail';
import ProfileNavigation from './ProfileNavigation';
import { StandSpinner } from '../../Interface';

function UserCover() {
  const { loading } = useSelector(({ user }) => user.loadingState);
  if (loading) return <StandSpinner />;

  return (
    <div className={styles.landscape}>
      <div className={styles.content}>
        <CoverImage />
        <ProfileImage />
        <UsernameAndEmail />
        <ProfileNavigation />
      </div>
    </div>
  );
}

export default UserCover;

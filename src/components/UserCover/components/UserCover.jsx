import { useSelector } from 'react-redux';

import { useForeignUser } from '../../../hooks';

import styles from './styles/userCover.module.scss';
import CoverImage from './CoverImage';
import ProfileImage from './ProfileImage';
import UsernameAndEmail from './UsernameAndEmail';
import ProfileNavigation from './ProfileNavigation';
import FriendShip from './FriendShip';
import { StandSpinner } from '../../Interface';

function UserCover() {
  const { loading } = useSelector(({ user }) => user.loadingState);

  const isActiveUserProfile = useForeignUser('basedOnLocation');

  if (loading) return <StandSpinner />;

  return (
    <div className={styles.landscape}>
      <div className={styles.content}>
        <CoverImage />
        <ProfileImage />
        <UsernameAndEmail />
        {!isActiveUserProfile && <FriendShip />}
        <ProfileNavigation />
      </div>
    </div>
  );
}

export default UserCover;

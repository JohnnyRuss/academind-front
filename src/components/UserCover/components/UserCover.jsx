import styles from './userCover.module.scss';
import CoverImage from './CoverImage';
import ProfileImage from './ProfileImage';
import UsernameAndEmail from './UsernameAndEmail';
import ProfileNavigation from './ProfileNavigation';

function UserCover() {
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

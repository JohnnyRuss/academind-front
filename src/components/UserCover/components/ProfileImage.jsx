import { useSelector } from 'react-redux';

import styles from './profileImage.module.scss';
import { Image } from '../../Interface';
import { CameraIcon } from '../../Layouts/Icons/icons';

function ProfileImage() {
  const img = useSelector(({ user }) => user.user.profileImg);

  return (
    <div className={styles.profile}>
      <Image src={img} className={styles.profileImg} />
      <label htmlFor='' className={styles.changeMediaBtn}>
        <CameraIcon />
      </label>
    </div>
  );
}

export default ProfileImage;

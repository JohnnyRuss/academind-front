import { useSelector } from 'react-redux';

import styles from './coverImage.module.scss';
import { Image } from '../../Interface';
import { CameraIcon } from '../../Layouts/Icons/icons';

function CoverImage() {
  const img = useSelector(({ user }) => user.user.coverImg);

  return (
    <div className={styles.cover}>
      <Image src={img} className={styles.coverImg} />
      <label htmlFor='' className={styles.changeMediaBtn}>
        <CameraIcon />
      </label>
    </div>
  );
}

export default CoverImage;

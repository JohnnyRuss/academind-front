import styles from './avatar.module.scss';
import { Image } from '../../Layouts';

function Avatar({ img = '/img/profile-default.webp', onClick = () => {} }) {
  return (
    <Image
      src={img}
      className={styles.avatar}
      onClick={onClick}
    />
  );
}

export default Avatar;

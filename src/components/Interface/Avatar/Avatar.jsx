import styles from './avatar.module.scss';
import { Image } from '../';

function Avatar({ img = '/img/avatar.png', onClick = () => {} }) {
  return (
    <Image
      src={img}
      className={styles.avatar}
      onClick={onClick}
    />
  );
}

export default Avatar;

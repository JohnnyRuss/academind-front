import styles from './avatar.module.scss';
import { Image } from '../';

function Avatar({ img = '/img/avatar.png', className }) {
  return <Image src={img} className={`${styles.avatar} ${className || ''}`} data-avatar />;
}

export default Avatar;

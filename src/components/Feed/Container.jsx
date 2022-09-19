import styles from './styles/container.module.scss';
import { useScrollUp } from '../../hooks';

function Container({ children }) {
  useScrollUp('top');
  return <div className={styles.feedContainer}>{children}</div>;
}

export default Container;

import styles from './components/container.module.scss';

function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;

import styles from './components/container.module.scss';

function Posts({ children }) {
  return <div className={styles.container}>{children}</div>
}

export default Posts;

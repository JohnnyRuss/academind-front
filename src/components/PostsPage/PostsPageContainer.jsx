import styles from './components/styles/postsPageContainer.module.scss';

function PostsPageContainer({ children }) {
  return <div className={styles.postsPageContainer}>{children}</div>
}

export default PostsPageContainer;

import styles from './components/styles/postsPageContainer.module.scss';
import { useScrollUp } from '../../hooks';

function PostsPageContainer({ children }) {
  useScrollUp('top');
  return <div className={styles.postsPageContainer}>{children}</div>;
}

export default PostsPageContainer;

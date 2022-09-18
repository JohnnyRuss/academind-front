import { usePost } from '../../../hooks';

import styles from './styles/postsPageContent.module.scss';
import { Post } from '../../Layouts';

function PostsPagePostsList({ children, data }) {
  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();

  return (
    <div className={styles.postsPageContent}>
      {children}
      {data?.map((post) => (
        <Post
          key={post._id}
          className={styles.postsPageContentItem}
          data={post}
          activatePostMediaHandler={activatePostMediaHandler}
          activateUpdatePostModal={activateUpdatePostModal}
        />
      ))}
    </div>
  );
}

export default PostsPagePostsList;

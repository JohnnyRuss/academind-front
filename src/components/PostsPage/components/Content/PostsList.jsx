import { usePost } from '../../../../hooks';

import styles from './postsList.module.scss';
import { Post } from '../../../Layouts';

function PostsList({ children, data }) {
  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();

  return (
    <div className={styles.content}>
      {children}
      {data?.map((post) => (
        <Post
          key={post._id}
          className={styles.profileFeedPost}
          data={post}
          activatePostMediaHandler={activatePostMediaHandler}
          activateUpdatePostModal={activateUpdatePostModal}
        />
      ))}
    </div>
  );
}

export default PostsList;

import { uid } from 'uid';

import { usePost } from '../../../hooks';

import styles from './content.module.scss';
import { posts } from '../../../utils';
import { Post, CreatePost } from '../../Layouts';

function Content() {
  const { activatePostMediaHandler, activateSharePostModal } = usePost();
  return (
    <div className={styles.content}>
      <CreatePost />
      {[1, 2, 3].map((post) => (
        <Post
          options={{ report: true, save: true }}
          data={posts[post]}
          activatePostMediaHandler={activatePostMediaHandler}
          activateSharePostModal={activateSharePostModal}
          key={uid(6)}
        />
      ))}
    </div>
  );
}

export default Content;

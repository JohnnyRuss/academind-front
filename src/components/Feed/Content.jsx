import { useSelector } from 'react-redux';

import { selectPosts } from '../../store/selectors/postSelectors';
import { usePost } from '../../hooks';

import styles from './styles/content.module.scss';
import { Post, CreatePost } from '../Layouts';

function Content() {
  const data = useSelector(selectPosts);
  const { activatePostMediaHandler, activateSharePostModal } = usePost();

  return (
    <div className={styles.content}>
      <CreatePost />
      {data.map((post) => (
        <Post
          options={{ report: true, save: true }}
          data={post}
          activatePostMediaHandler={activatePostMediaHandler}
          activateSharePostModal={activateSharePostModal}
          key={post._id}
        />
      ))}
    </div>
  );
}

export default Content;

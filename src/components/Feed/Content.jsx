/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../../store/selectors/userSelectors';
import { selectPosts } from '../../store/selectors/postSelectors';
import { getFeedPosts } from '../../store/reducers/userReducer';
import { usePost } from '../../hooks';

import styles from './styles/content.module.scss';
import { Post, CreatePost } from '../Layouts';

function Content() {
  const dispatch = useDispatch();

  const { id } = useSelector(selectUserId);
  const data = useSelector(selectPosts);

  const { activatePostMediaHandler, activateSharePostModal } = usePost();

  useEffect(() => {
    dispatch(getFeedPosts(id));
  }, []);

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

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProfilePosts } from '../../store/reducers/userReducer';
import { selectPosts } from '../../store/selectors/postSelectors';

import styles from './components/Content/postsList.module.scss';
import { CreatePost } from '../Layouts';
import PostsList from './components/Content/PostsList';

function Content() {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfilePosts(id));
  }, [dispatch, id]);

  return (
    <PostsList data={posts}>
      <CreatePost className={styles.createPostEl} />
    </PostsList>
  );
}

export default Content;

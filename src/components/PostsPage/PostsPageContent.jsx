import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProfilePosts } from '../../store/reducers/userReducer';
import { selectPosts } from '../../store/selectors/postSelectors';

import styles from './components/styles/postsPageContent.module.scss';
import { CreatePost } from '../Layouts';
import PostsPagePostsList from './components/PostsPagePostsList';

function PostsPageContent() {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfilePosts(id));
  }, [dispatch, id]);

  return (
    <PostsPagePostsList data={posts}>
      <CreatePost className={styles.postsPageContentCreatePostEl} />
    </PostsPagePostsList>
  );
}

export default PostsPageContent;

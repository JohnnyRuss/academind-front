import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProfilePosts } from '../../store/reducers/postsDataReducer';
import { selectProfilePosts } from '../../store/selectors/postSelectors';

import styles from './components/Content/postsList.module.scss';
import { CreatePost } from '../Layouts';
import PostsList from './components/Content/PostsList';

function Content() {
  const dispatch = useDispatch();

  const posts = useSelector(selectProfilePosts);

  const { file } = useSelector(({ createPost }) => createPost);

  async function handlePost(description) {
    // createPost({ variables: { description, type: 'post', media: file } });
  }

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfilePosts(id));
  }, [dispatch, id]);

  return (
    <PostsList data={posts}>
      <CreatePost className={styles.createPostEl} handlePost={handlePost} />
    </PostsList>
  );
}

export default Content;

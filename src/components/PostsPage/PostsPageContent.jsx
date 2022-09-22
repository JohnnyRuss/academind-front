import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProfilePosts } from '../../store/reducers/userReducer';
import { resetPosts } from '../../store/reducers/postsDataReducer';
import { selectPosts } from '../../store/selectors/postSelectors';

import { CreatePost } from '../Layouts';
import PostsPagePostsList from './components/PostsPagePostsList';

function PostsPageContent() {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfilePosts(id));
    return () => dispatch(resetPosts());
  }, [dispatch, id]);

  return (
    <PostsPagePostsList data={posts}>
      <CreatePost />
    </PostsPagePostsList>
  );
}

export default PostsPageContent;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getUserProfile } from '../../store/reducers/userReducer';

import { PostsPageContainer, PostsPageSideBar, PostsPageContent } from '../../components/PostsPage';

function PostPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  return (
    <PostsPageContainer>
      <PostsPageSideBar />
      <PostsPageContent />
    </PostsPageContainer>
  );
}

export default PostPage;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getUserProfile } from '../../store/reducers/userReducer';

import { Container, SideBar, Content } from '../../components/PostsPage';

function PostPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  return (
    <Container>
      <SideBar />
      <Content />
    </Container>
  );
}

export default PostPage;

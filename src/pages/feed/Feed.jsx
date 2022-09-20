/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../../store/selectors/userSelectors';
import { getFeedPosts } from '../../store/reducers/userReducer';

import { Container, Content, SideBarRight } from '../../components/Feed';
import { SideBar as SideBarLeft } from '../../components/Layouts';
import { StandSpinner } from '../../components/Interface';

function Feed() {
  const dispatch = useDispatch();

  const { id } = useSelector(selectUserId);
  const { loading } = useSelector(({ user }) => user.loadingState);

  useEffect(() => {
    dispatch(getFeedPosts(id));
  }, []);

  if (loading) return <StandSpinner />;

  return (
    <Container>
      <SideBarLeft />
      <Content />
      <SideBarRight />
    </Container>
  );
}

export default Feed;

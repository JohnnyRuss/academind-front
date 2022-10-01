import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectPosts } from '../../store/selectors/postSelectors';
import { getProfilePosts } from '../../store/reducers/userReducer';
import { resetPosts } from '../../store/reducers/postsDataReducer';

import { PROFILE_POSTS_COUNT_PER_REQ } from '../../lib/config';

import { PostsPageContainer, PostsPageSideBar, PostsPageContent } from '../../components/PostsPage';
import { StandSpinner } from '../../components/Interface';

function PostPage() {
  const dispatch = useDispatch();

  const { posts, hasMore } = useSelector(selectPosts);
  const {
    loadingState: { loading },
  } = useSelector(({ user }) => user);

  const { id } = useParams();

  const [page, setPage] = useState(1);
  async function handleNext() {
    dispatch(
      getProfilePosts({ id, page: page + 1, limit: PROFILE_POSTS_COUNT_PER_REQ, hasMore: true })
    );
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    dispatch(getProfilePosts({ id, page: 1, limit: PROFILE_POSTS_COUNT_PER_REQ, hasMore: false }));
    return () => dispatch(resetPosts());
  }, [dispatch, id]);

  if (loading) return <StandSpinner />;

  return (
    <PostsPageContainer>
      <PostsPageSideBar />
      <PostsPageContent posts={posts} infinite={{ handleNext, hasMore }} />
    </PostsPageContainer>
  );
}

export default PostPage;

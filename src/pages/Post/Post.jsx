/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { getPost, resetPosts } from '../../store/reducers/postsDataReducer';
import { selectPosts } from '../../store/selectors/postSelectors';

import { Post as SinglePost } from '../../components/Layouts';
import { StandSpinner } from '../../components/Interface';

function Post() {
  const { id } = useParams();
  const { state: pathState } = useLocation();

  const dispatch = useDispatch();
  const { posts } = useSelector(selectPosts);
  const {
    loadingState: { loading },
  } = useSelector(({ postsData }) => postsData);

  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(resetPosts());
  }, []);

  return (
    <div style={{ marginTop: '9rem' }}>
      {loading && <StandSpinner />}
      {!loading && posts[0] && (
        <SinglePost data={posts[0]} notifyOnComment={pathState?.commentId ? pathState : null} />
      )}
    </div>
  );
}

export default Post;

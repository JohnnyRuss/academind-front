/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPost, resetPosts } from '../../store/reducers/postsDataReducer';
import { selectPosts } from '../../store/selectors/postSelectors';
import { Post as SinglePost } from '../../components/Layouts';

function Post() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { posts } = useSelector(selectPosts);

  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(resetPosts());
  }, []);

  return <div style={{ marginTop: '9rem' }}>{posts[0] && <SinglePost data={posts[0]} />}</div>;
}

export default Post;

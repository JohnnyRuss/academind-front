/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPost, getRelatedPosts, resetPosts } from '../../store/reducers/postsDataReducer';

import styles from './components/ActiveBlogPost/styles/activeBlogPost.module.scss';
import { LeftBar, RightBar, Content } from './components/ActiveBlogPost';
import { StandSpinner } from '../Interface';

function ActiveBlogPost() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    posts,
    loadingState: { loading },
  } = useSelector(({ postsData }) => postsData);
  const post = posts[0];

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getRelatedPosts({ postId: id, limit: 2 }));

    return () => dispatch(resetPosts());
  }, []);

  return (
    <div className={styles.box}>
      {loading && <StandSpinner />}
      <LeftBar />
      {!loading && post && <Content post={post} />}
      <RightBar />
    </div>
  );
}

export default ActiveBlogPost;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBlogPosts, resetPosts } from '../../store/reducers/postsDataReducer';

import styles from './components/Blog/styles/blog.module.scss';
import { SideBar, BlogPost, CreateBlogPostTouch } from '../Layouts';
import { StandSpinner } from '../Interface';
import { Stand, RightBar, CategoriesNav } from './components/Blog';

function Blog() {
  const dispatch = useDispatch();
  const {
    posts,
    loadingState: { loading },
  } = useSelector(({ postsData }) => postsData);

  useEffect(() => {
    dispatch(getBlogPosts());
    return () => dispatch(resetPosts());
  }, []);

  // console.log(posts);

  return (
    <div className={styles.blogPage}>
      {/* {loading && <StandSpinner />} */}
      {posts[0] && (
        <>
          <SideBar className={styles.leftBar}>{/* <p>test</p> */}</SideBar>
          <Stand />
          <CategoriesNav />
          <div className={styles.content}>
            <CreateBlogPostTouch />
            {posts.map((post) => (
              <BlogPost post={post} key={post._id} />
            ))}
          </div>
          <RightBar />
        </>
      )}
    </div>
  );
}

export default Blog;

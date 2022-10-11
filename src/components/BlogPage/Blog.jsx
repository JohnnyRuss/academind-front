import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './components/Blog/styles/blog.module.scss';
import { SideBar, BlogPost, CreateBlogPostTouch, ScrollEnd } from '../Layouts';
import { StandSpinner, BlockSpinner } from '../Interface';
import { Stand, RightBar, CategoriesNav } from './components/Blog';

function Blog({ posts, loading, hasMore, handleNext }) {
  return (
    <div className={styles.blogPage}>
      {loading && <StandSpinner />}
      {!loading && (
        <>
          <Stand />
          <CategoriesNav />
          <CreateBlogPostTouch className={styles.blogPageCreateBlogPostTouch} />
          <RightBar />
          <SideBar className={styles.leftBar}/>
          <InfiniteScroll
            dataLength={posts?.length}
            next={handleNext}
            hasMore={hasMore}
            loader={<BlockSpinner />}
            endMessage={<ScrollEnd />}
            className={styles.blogPostsScrollBox}>
            {posts.map((post) => (
              <BlogPost post={post} key={post._id} />
            ))}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
}

export default Blog;

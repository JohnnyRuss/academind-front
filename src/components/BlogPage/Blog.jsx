import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './components/Blog/styles/blog.module.scss';
import { SideBar, BlogPost, CreateBlogPostTouch } from '../Layouts';
import { StandSpinner } from '../Interface';
import { Stand, RightBar, CategoriesNav } from './components/Blog';

function Blog({ posts, loading, hasMore, handleNext }) {
  return (
    <div className={styles.blogPage}>
      {loading && <StandSpinner />}
      {!loading && (
        <>
          <SideBar className={styles.leftBar}>{/* <p>test</p> */}</SideBar>
          <Stand />
          <CategoriesNav />
          <div className={styles.content}>
            <CreateBlogPostTouch />
            <InfiniteScroll
              dataLength={posts?.length}
              next={handleNext}
              hasMore={hasMore}
              loader={<p>loading</p>}
              endMessage={<p>there are no more posts</p>}
              style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {posts.map((post) => (
                <BlogPost post={post} key={post._id} />
              ))}
            </InfiniteScroll>
          </div>
          <RightBar />
        </>
      )}
    </div>
  );
}

export default Blog;

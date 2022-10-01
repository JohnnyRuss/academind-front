import { usePost } from '../../hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './styles/feedContent.module.scss';
import { Post, CreatePost } from '../Layouts';

function FeedContent({ hasMore, handleNext, posts }) {
  const { activatePostMediaHandler, activateSharePostModal } = usePost();

  return (
    <div className={styles.feedContent}>
      <CreatePost />
      <InfiniteScroll
        hasMore={hasMore}
        next={handleNext}
        dataLength={posts.length}
        loader={<p>loading</p>}
        endMessage={<p>there are no more posts</p>}
        style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {posts.map((post) => (
          <Post
            options={{ report: true, save: true }}
            data={post}
            activatePostMediaHandler={activatePostMediaHandler}
            activateSharePostModal={activateSharePostModal}
            key={post._id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default FeedContent;

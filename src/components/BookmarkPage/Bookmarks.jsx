import { usePost } from '../../hooks';

import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './components/bookmarks.module.scss';
import { Post, DeletedPost, ScrollEnd } from '../Layouts';
import { Spinner, BlockSpinner } from '../Interface';

function Bookmarks({ loading, hasMore, handleNext, posts }) {
  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();

  return (
    <div className={styles.bookmarks}>
      {loading && <Spinner />}
      <InfiniteScroll
        hasMore={hasMore}
        next={handleNext}
        dataLength={posts.length}
        loader={<BlockSpinner />}
        endMessage={<ScrollEnd />}
        style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {!loading &&
          posts?.map((bookmark) =>
            (bookmark.deleted || bookmark.restricted) &&
            (bookmark.type === 'blogPost' || !bookmark.type) ? (
              <DeletedPost postId={bookmark._id} key={bookmark._id} />
            ) : (
              <Post
                data={bookmark}
                key={bookmark._id}
                activatePostMediaHandler={activatePostMediaHandler}
                activateUpdatePostModal={activateUpdatePostModal}
              />
            )
          )}
      </InfiniteScroll>
    </div>
  );
}

export default Bookmarks;

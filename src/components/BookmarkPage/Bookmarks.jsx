import { usePost, useRestrictPrivateRoute } from '../../hooks';

import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './components/bookmarks.module.scss';
import { Post, DeletedPost } from '../Layouts';
import { Spinner } from '../Interface';

function Bookmarks({ loading, hasMore, handleNext, posts }) {
  useRestrictPrivateRoute();

  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();

  return (
    <div className={styles.bookmarks}>
      {loading && <Spinner />}
      <InfiniteScroll
        hasMore={hasMore}
        next={handleNext}
        dataLength={posts.length}
        loader={<p>loading</p>}
        endMessage={<p>there are no more posts</p>}
        style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {!loading &&
          posts?.map((bookmark) =>
            bookmark.deleted ? (
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

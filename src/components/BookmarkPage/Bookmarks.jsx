import { usePost, useScroll } from '../../hooks';

import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './components/bookmarks.module.scss';
import { Post, DeletedPost, ScrollEnd } from '../Layouts';
import { BlockSpinner } from '../Interface';

function Bookmarks({ loading, hasMore, handleNext, posts }) {
  useScroll({ target: 'elem', scrollTo: 'bookmarks__page', options: { block: 'start' } });

  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();

  return (
    <div className={styles.bookmarks} id='bookmarks__page'>
      {loading && <BlockSpinner />}
      {!loading && (
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
      )}
    </div>
  );
}

export default Bookmarks;

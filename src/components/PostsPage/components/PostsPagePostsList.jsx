import { usePost } from '../../../hooks';

import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './styles/postsPageContent.module.scss';
import { Post, ScrollEnd } from '../../Layouts';
import { BlockSpinner } from '../../Interface';

function PostsPagePostsList({ children, data, infinite }) {
  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();
  const { handleNext, hasMore } = infinite;

  return (
    <div className={styles.postsPageContent}>
      {children}
      <InfiniteScroll
        dataLength={data?.length}
        next={handleNext}
        hasMore={hasMore}
        loader={<BlockSpinner />}
        endMessage={<ScrollEnd />}
        className={styles.postsPageContentScroll}>
        {data?.map((post) => (
          <Post
            key={post._id}
            data={post}
            activatePostMediaHandler={activatePostMediaHandler}
            activateUpdatePostModal={activateUpdatePostModal}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PostsPagePostsList;

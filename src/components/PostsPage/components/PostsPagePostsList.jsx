import { usePost } from '../../../hooks';

import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './styles/postsPageContent.module.scss';
import { Post } from '../../Layouts';

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
        loader={<p>loading</p>}
        endMessage={<p>there are no more posts</p>}
        style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
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

import { usePost } from "../../hooks";
import InfiniteScroll from "react-infinite-scroll-component";

import "./styles/feedInfiniteScroll.scss";
import styles from "./styles/feedContent.module.scss";
import { Post, CreatePost, ScrollEnd } from "../Layouts";
import { BlockSpinner } from "../Interface";

function FeedContent({ hasMore, handleNext, posts }) {
  const { activatePostMediaHandler, activateSharePostModal } = usePost();

  return (
    <div className={styles.feedContent}>
      <CreatePost className={styles.feedCreatePost} />
      <InfiniteScroll
        hasMore={hasMore}
        next={handleNext}
        dataLength={posts.length}
        loader={<BlockSpinner />}
        endMessage={<ScrollEnd />}
        className={styles.feedInfiniteScroll}
      >
        {posts.map((post) => (
          <Post
            options={{ report: true, save: true }}
            data={post}
            activatePostMediaHandler={activatePostMediaHandler}
            activateSharePostModal={activateSharePostModal}
            className={styles.feedPost}
            key={post._id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default FeedContent;

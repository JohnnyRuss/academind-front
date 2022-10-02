import { useSelector } from 'react-redux';

import styles from './styles/topRatedPosts.module.scss';
import { BlogPost } from '../../../Layouts';
import { Spinner } from '../../../Interface';

function TopRatedPosts() {
  const {
    topRatedBlogPosts: posts,
    topRatedPostsLoadingState: { loading },
  } = useSelector(({ postsData }) => postsData);

  return (
    <div className={styles.topRatedPosts}>
      {loading && <Spinner />}
      {!loading &&
        posts?.map((post) => (
          <BlogPost
            post={post}
            limitation={350}
            className={styles.topRatedBlogPost}
            key={post._id}
          />
        ))}
    </div>
  );
}

export default TopRatedPosts;

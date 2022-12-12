import { useSelector } from "react-redux";
import {
  selectTopRatedBlogPosts,
  selectTopRatedBlogPostsLoadingState,
} from "../../../../store/selectors/postSelectors";

import styles from "./styles/topRatedPosts.module.scss";
import { BlogPost, Spinner } from "../../../Layouts";

function TopRatedPosts() {
  const posts = useSelector(selectTopRatedBlogPosts);
  const { loading } = useSelector(selectTopRatedBlogPostsLoadingState);

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

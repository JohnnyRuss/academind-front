import { useSelector } from 'react-redux';

import styles from './styles/relatedPosts.module.scss';
import { BlogPost } from '../../../Layouts';

function RelatedPosts() {
  const relatedPosts = useSelector(({ postsData }) => postsData.relatedPosts);
  return (
    <div className={styles.blogPostsRelated}>
      {relatedPosts?.map((post) => (
        <BlogPost limitation={500} post={post} key={post._id} className={styles.relatedBlogPost} />
      ))}
    </div>
  );
}

export default RelatedPosts;

import { uid } from 'uid';

import { blogPosts } from '../../../../utils';
import { BlogPost } from '../../../Layouts';
import styles from './topRatedPosts.module.scss';

function TopRatedPosts() {
  return (
    <div className={styles.topRatedPosts}>
      {blogPosts.map((post) => (
        <BlogPost post={post} limitation={350} className='observItem' key={uid(6)} />
      ))}
    </div>
  );
}

export default TopRatedPosts;

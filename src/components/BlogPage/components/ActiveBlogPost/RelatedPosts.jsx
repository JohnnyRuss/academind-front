import { uid } from 'uid';
import styles from './relatedPosts.module.scss';
import { UserIdentifier, BlogPost } from '../../../Layouts';
import { Img } from '../../../Interface';
import { blogPosts } from '../../../../utils/index';

function RelatedPosts() {
  return (
    <div className={styles.blogPostsRelated}>
      {blogPosts.map((post) => (
        <BlogPost limitation={200} post={post} key={uid(6)} />
      ))}
      {/* <div className={styles.blogPostCard}>
        <Img src='/img/post-4.jpg' className={styles.cardImg} />
        <p className={styles.cardTitle}>post title</p>
        <UserIdentifier withTime={false} className={styles.cardAvatar} img='/img/user-1.jpg' />
      </div>
      <div className={styles.blogPostCard}>
        <Img src='/img/post-5.jpg' className={styles.cardImg} />
        <p className={styles.cardTitle}>post title</p>
        <UserIdentifier withTime={false} className={styles.cardAvatar} img='/img/user-2.jpg' />
      </div>
      <div className={styles.blogPostCard}>
        <Img src='/img/post-6.jpg' className={styles.cardImg} />
        <p className={styles.cardTitle}>post title</p>
        <UserIdentifier withTime={false} className={styles.cardAvatar} img='/img/user-3.jpg' />
      </div>
      <div className={styles.blogPostCard}>
        <Img src='/img/post-2.jpg' className={styles.cardImg} />
        <p className={styles.cardTitle}>post title</p>
        <UserIdentifier withTime={false} className={styles.cardAvatar} img='/img/user-4.jpg' />
      </div> */}
    </div>
  );
}

export default RelatedPosts;

import styles from './components/styles/blogPost.module.scss';
import { Image, Link } from '../../Interface';
import { ReviewUserInteraction, ReviewUserDetails } from './components';

function BlogPost({ post, limitation = 2000, className, options = true, id }) {
  const article =
    post?.article?.length > limitation ? `${post.article?.slice(0, limitation)}...` : post?.article;

  return (
    <div className={`${styles.blogPost} ${className}`} id={id ? id : ''}>
      {post?.media && <Image src={post.media[0]} className={styles.blogPostMedia} />}
      <div className={styles.blogPostInfo}>
        <div className={styles.devideRow}>
          <ReviewUserDetails
            title={post?.title}
            userName={post?.userName}
            userImg={post?.userImg}
            createdAt={post?.createdAt}
          />
          <ReviewUserInteraction comments={post?.comments} options={options} postId={post.id} />
        </div>
        <p className={styles.blogPostShortDesc}>
          {article}
          {post?.article?.length > limitation && (
            <Link path={{ pathname: '/blog/id', query: { user: post.userName } }} target='_blank'>
              <button className={styles.showMoreBtn}>show more</button>
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

export default BlogPost;

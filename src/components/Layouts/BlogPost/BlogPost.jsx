import styles from './components/styles/blogPost.module.scss';
import { Image, Link } from '../../Interface';
import { ReviewUserInteraction, ReviewUserDetails } from './components';

function BlogPost({ post, limitation = 2000, className, referenced, options = true, id }) {
  const article =
    post?.article?.length > limitation ? `${post.article?.slice(0, limitation)}...` : post?.article;

  return (
    <div className={`${styles.blogPost} ${className}`} id={id ? id : ''}>
      {post?.media?.[0] && <Image src={post.media?.[0]} className={styles.blogPostMedia} />}
      <div className={styles.blogPostInfo}>
        <div className={styles.devideRow}>
          <ReviewUserDetails
            title={post.title}
            userName={post.author?.userName}
            userImg={post.author?.profileImg}
            postId={post._id}
            createdAt={post.createdAt}
          />
          {!referenced && (
            <ReviewUserInteraction
              commentsAmount={post?.commentsAmount}
              likesAmount={post.likesAmount}
              dislikesAmount={post.dislikesAmount}
            />
          )}
        </div>
        <p className={styles.blogPostShortDesc}>
          {article}
          {post?.article?.length > limitation && (
            <Link
              path={{ pathname: `/blog/${post._id}`, query: { user: post.userName } }}
              target='_blank'>
              <button className={styles.showMoreBtn}>show more</button>
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

export default BlogPost;

import { useMemo } from 'react';

import styles from './components/styles/blogPost.module.scss';
import { Image, Link } from '../../Interface';
import { BlogPostIdentifier } from '../../Layouts';
import { ReviewUserInteraction } from './components';

function BlogPost({ post, limitation = 1500, className, referenced, id }) {
  const article = useMemo(
    () =>
      post?.article?.length > limitation
        ? `${post.article?.slice(0, limitation)}...`
        : post?.article,
    [limitation, post.article]
  );

  return (
    <div className={`${styles.blogPost} ${className || ''}`} id={id ? id : ''}>
      {post?.media?.[0] && <Image src={post.media?.[0]} className={styles.blogPostMedia} />}
      <div className={styles.blogPostInfo}>
        <div className={styles.devideRow}>
          <BlogPostIdentifier
            title={post.title}
            author={post.author}
            tags={post.tags}
            categories={post.categories}
            audience={post.audience}
            postId={post._id}
            createdAt={post.createdAt}
          />
          {!referenced && (
            <ReviewUserInteraction
              commentsAmount={post?.commentsAmount}
              likesAmount={post.likesAmount}
              dislikesAmount={post.dislikesAmount}
              postId={post._id}
            />
          )}
        </div>
        <p className={styles.blogPostShortDesc} data-article-text>
          {article}
          {post?.article?.length > limitation && (
            <Link
              path={{
                pathname: `/blog/${post._id}`,
                query: { user: post.userName },
              }}
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

import { Link } from "react-router-dom";
import styles from "./blogPostIdentifier.module.scss";
import { TimeAgoAndAudience, Tags, Avatar } from "../../Layouts";

function BlogPostIdentifier({
  createdAt,
  title,
  author,
  postId,
  tags,
  categories,
  audience,
}) {
  return (
    <div className={styles.reviewDetails} data-blog-post-identifier>
      <Link
        to={{
          pathname: `/blog/${postId}`,
          query: { user: author?.userName },
        }}
        target="_blank"
        className={styles.blogPostTitle}
      >
        <h3 data-title>{title}</h3>
      </Link>
      <div className={styles.publisher}>
        <Avatar img={author?.profileImg} />
        <Link
          to={`/profile/${author?._id}/posts`}
          className={styles.blogPostUserName}
        >
          {author?.userName}
        </Link>
        {tags?.[0] && <Tags tags={tags} />}
      </div>
      <TimeAgoAndAudience timeAgo={createdAt} audience={audience} />
      {categories?.[0] && (
        <div className={styles.blogPostCategories} data-categories-list>
          {categories.map((category, i) => (
            <span key={`${postId}-category-${i}`}>#{category}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPostIdentifier;

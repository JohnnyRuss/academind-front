import styles from "./blogPostIdentifier.module.scss";
import { Link, Avatar, TimeAgo } from "../../Interface";
import { TimeAgoAndAudience, Tags } from "../../Layouts";
import { ClockIcon } from "../../Layouts/Icons/icons";

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
        path={{
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
          path={`/profile/${author?._id}/posts`}
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

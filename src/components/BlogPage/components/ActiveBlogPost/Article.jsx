import styles from './styles/article.module.scss';
import { UserIdentifier } from '../../../Layouts';

function Article({ post }) {
  return (
    <>
      <div className={styles.postIntro}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <UserIdentifier
          img={post.author.profileImg}
          userName={post.author.userName}
          timeAgo={post.createdAt}
        />
      </div>
      <div className={styles.article}>{post.article}</div>
    </>
  );
}

export default Article;

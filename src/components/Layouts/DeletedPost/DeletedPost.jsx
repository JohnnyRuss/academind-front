import { usePostQuery } from '../../../hooks';

import styles from './deletedPost.module.scss';
import { ErrorIcon } from '../Icons/icons';
import PostOptions from '../PostOptions/PostOptions';

function DeletedPost({ postId }) {
  const { savePostHandler } = usePostQuery();

  return (
    <div className={styles.deletedPost} data-deleted-post>
      <ErrorIcon /> Post Is Deleted
      <PostOptions savePostHandler={() => savePostHandler(postId)} postId={postId} />
    </div>
  );
}

export default DeletedPost;

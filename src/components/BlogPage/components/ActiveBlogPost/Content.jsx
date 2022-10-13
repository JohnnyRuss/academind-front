import { useState, useRef } from 'react';

import styles from './styles/content.module.scss';
import { Media, Article, RelatedPosts } from './';
import { PostActions, CommentsList } from '../../../Layouts';
import { CommentIcon, ArrowUpRectingle } from '../../../Layouts/Icons/icons';

function Content({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      {post.media[0] && <Media media={post.media} />}
      <Article post={post} />
      <RelatedPosts />
      <div className={styles.comments} id='commentBlock'>
        <PostActions setShowCommnents={setShowComments} data={post} />
        {showComments && (
          <CommentsList
            postId={post._id}
            postAuthorId={post?.author._id}
            commentsAmount={post.commentsAmount}
          />
        )}
      </div>
    </>
  );
}

export default Content;

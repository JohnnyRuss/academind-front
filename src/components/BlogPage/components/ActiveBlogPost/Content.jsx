import { useState, useRef } from 'react';

import styles from './styles/content.module.scss';
import { Media, Article, RelatedPosts } from './';
import { PostActions, CommentsList } from '../../../Layouts';
import { CommentIcon, ArrowUpRectingle } from '../../../Layouts/Icons/icons';

function Content({ post }) {
  const [showComments, setShowComments] = useState(false);

  //   const [labelTarget, setLabelTarget] = useState('deny');
  //   const labelRef = useRef();
  //   function transformLabel(e) {
  //     const targetHref = e.currentTarget.getAttribute('href');
  //     if (targetHref === '#commentBlock') {
  //       labelRef.current?.setAttribute('href', '#top');
  //       setLabelTarget('top');
  //     } else if (targetHref === '#top') {
  //       labelRef.current?.setAttribute('href', '#commentBlock');
  //       setLabelTarget('bottom');
  //     }
  //   }

  return (
    <div
      className={`${styles.content} ${
        post.media[0] ? styles.contentWithMedia : styles.contentWithoutMedia
      }`}>
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
      {
      /*
       <a
        href='#commentBlock'
        className={styles.commentLabel}
        ref={labelRef}
        onClick={transformLabel}>
        {(labelTarget === 'top' || labelTarget === 'deny') && <CommentIcon />}
        {labelTarget === 'bottom' && <ArrowUpRectingle />}
      </a> 
      */
      }
    </div>
  );
}

export default Content;

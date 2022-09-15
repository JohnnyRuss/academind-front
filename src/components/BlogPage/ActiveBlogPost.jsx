import { useState, useRef } from 'react';

import { useCounter } from '../../hooks';
import { blogPosts } from '../../utils/index';

import styles from './components/ActiveBlogPost/activeBlogPost.module.scss';
import { LeftBar, RightBar, Media, Article, RelatedPosts } from './components/ActiveBlogPost';
import { CommentsList, PostActions } from '../Layouts';
import { CommentIcon, ArrowUpRectingle } from '../Layouts/Icons/icons';

function ActiveBlogPost() {
  const [showComments, setShowComments] = useState(true);
  const post = blogPosts[0];
  const commentsAmount = useCounter(post.comments, 'replies');

  const [labelTarget, setLabelTarget] = useState('deny');
  const labelRef = useRef();
  function transformLabel(e) {
    const targetHref = e.currentTarget.getAttribute('href');
    if (targetHref === '#commentBlock') {
      labelRef.current?.setAttribute('href', '#top');
      setLabelTarget('top');
    } else if (targetHref === '#top') {
      labelRef.current?.setAttribute('href', '#commentBlock');
      setLabelTarget('bottom');
    }
  }

  return (
    <div className={styles.box}>
      <LeftBar />
      <div className={styles.content}>
        <Media media={post.media} />
        <Article post={post} />
        <RelatedPosts />
        <div className={styles.comments} id='commentBlock'>
          <PostActions
            postId={post.id}
            setShowCommnents={setShowComments}
            commentsAmount={commentsAmount}
          />
          {showComments && <CommentsList comments={post.comments} />}
        </div>
        <a
          href='#commentBlock'
          className={styles.commentLabel}
          ref={labelRef}
          onClick={transformLabel}>
          {(labelTarget === 'top' || labelTarget === 'deny') && <CommentIcon />}
          {labelTarget === 'bottom' && <ArrowUpRectingle />}
        </a>
      </div>
      <RightBar />
    </div>
  );
}

export default ActiveBlogPost;

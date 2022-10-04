import { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import { usePostQuery } from '../../../hooks';
import {
  destructurePostAuthenticData,
  destructurePostUpdateData,
  destructureSharedPostHeaderData,
} from '../../../lib/destructurers';

import styles from './components/styles/post.module.scss';
import { SharedPostHeader } from './components';
import PostAuthentic from './PostAuthentic';
import { PostActions, PostOptions } from '../';
import { InlineSpinner, InlineStandSpinner } from '../../Interface';

const CommentsList = lazy(() => import('../Comments/CommentsList'), { suspense: true });

function Post({ data, activatePostMediaHandler, activateUpdatePostModal, className }) {
  const [showComments, setShowComments] = useState(false);
  const { deletePostHandler, startDeletion, savePostHandler } = usePostQuery();

  const { loading } = useSelector(({ postsData }) => postsData.loadingState);

  return (
    <article className={`${styles.post} ${className || ''}`}>
      {startDeletion && loading === true && <InlineStandSpinner />}
      <PostOptions
        postId={data._id}
        // savePostHandler={() => savePostHandler(data._id)}
        deleteHandler={() => deletePostHandler(data._id)}
        updateHandler={() => activateUpdatePostModal(destructurePostUpdateData(data))}
      />
      {data.shared && <SharedPostHeader data={destructureSharedPostHeaderData(data)} />}
      <PostAuthentic
        type={data.type}
        authenticType={data.authentic?.type}
        shared={data.shared}
        activatePostMediaHandler={activatePostMediaHandler}
        data={destructurePostAuthenticData(data)}
      />
      {data.type !== 'blogPost' && <PostActions setShowCommnents={setShowComments} data={data} />}
      {showComments && (
        <Suspense fallback={<InlineSpinner />}>
          <CommentsList
            postId={data._id}
            postAuthorId={data.author._id}
            commentsAmount={data.commentsAmount}
          />
        </Suspense>
      )}
    </article>
  );
}

export default Post;

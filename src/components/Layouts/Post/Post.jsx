import { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import { usePostQuery } from '../../../hooks';

import styles from './components/styles/post.module.scss';
import { InlineSpinner, InlineStandSpinner } from '../../Interface';
import { OptionsBig, PostActions } from '../';
import { SharedPostHeader } from './components';
import PostAuthentic from './PostAuthentic';
const Comments = lazy(() => import('./components/Comments'), { suspense: true });

function Post({ data, options, activatePostMediaHandler, activateUpdatePostModal, className }) {
  const [showComments, setShowComments] = useState(false);
  const { deletePostHandler, startDeletion } = usePostQuery();

  const { loading } = useSelector(({ postsData }) => postsData.loadingState);

  return (
    <article className={`${styles.post} ${className || ''}`}>
      {startDeletion && loading === true && <InlineStandSpinner />}
      <OptionsBig
        optBtnClassName={styles.postOptionsBtn}
        keyWord='post'
        {...({ options } || '')}
        deleteHandler={() => deletePostHandler(data._id)}
        updateHandler={() =>
          activateUpdatePostModal({
            description: data.shared ? data.shareDescription : data.description,
            media: data.media,
            type: data.type,
            shareDescription: data.shareDescription,
            article: data.article,
            title: data.title,
            comments: data.comments,
          })
        }
      />
      {data.shared && (
        <SharedPostHeader
          descriptionClassName={styles.description}
          identifierClassName={styles.identifier}
          data={{
            authorId: data.author._id,
            authorName: data.author.userName,
            authorImg: data.author.profileImg,
            description: data.description,
            createdAt: data.createdAt,
          }}
        />
      )}
      <PostAuthentic
        type={data.type}
        shared={data.shared}
        activatePostMediaHandler={activatePostMediaHandler}
        data={{
          authenticAuthorId: data.authenticAuthor?._id,
          authenticAuthorName: data.authenticAuthor?.userName,
          authenticAuthorImg: data.authenticAuthor?.profileImg,
          authenticDescription: data.authenticDescription,
          authenticDateCreation: data.authenticDateCreation,
          authorId: data.author._id,
          authorName: data.author.userName,
          authorImg: data.author.profileImg,
          createdAt: data.createdAt,
          description: data.description,
          media: data.media,
          comments: data.comments,
          article: data.article,
          title: data.title,
        }}
      />
      <PostActions setShowCommnents={setShowComments} data={data} />
      {showComments && (
        <Suspense fallback={<InlineSpinner />}>
          <Comments postId={data._id} />
        </Suspense>
      )}
    </article>
  );
}

export default Post;

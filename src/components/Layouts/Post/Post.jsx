import { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import { usePostQuery } from '../../../hooks';

import styles from './components/styles/post.module.scss';
import { SharedPostHeader } from './components';
import PostAuthentic from './PostAuthentic';
import { OptionsBig, PostActions } from '../';
import { InlineSpinner, InlineStandSpinner } from '../../Interface';

const CommentsList = lazy(() => import('../Comments/CommentsList'), { suspense: true });

function Post({ data, options, activatePostMediaHandler, activateUpdatePostModal, className }) {
  const [showComments, setShowComments] = useState(false);
  const { deletePostHandler, startDeletion } = usePostQuery();

  const { loading } = useSelector(({ postsData }) => postsData.loadingState);

  return (
    <article className={`${styles.post} ${className || ''}`}>
      {startDeletion && loading === true && <InlineStandSpinner />}
      <OptionsBig
        keyWord='post'
        {...({ options } || '')}
        optBtnClassName={styles.postOptionsBtn}
        deleteHandler={() => deletePostHandler(data._id)}
        updateHandler={() =>
          activateUpdatePostModal({
            _id: data._id,
            description: data.shared ? data.authenticDescription : data.description,
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
          userId: data.shared ? data.authenticAuthor._id : data.author._id,
          userName: data.shared ? data.authenticAuthor.userName : data.author.userName,
          createdAt: data.shared ? data.authenticDateCreation : data.createdAt,
          userImg: data.shared ? data.authenticAuthor.profileImg : data.author.profileImg,
          description: data.shared ? data.authenticDescription : data.description,
          media: data.media,
          comments: data.commentsCount,
          article: data.article,
          title: data.title,
        }}
      />
      <PostActions setShowCommnents={setShowComments} data={data} />
      {showComments && (
        <Suspense fallback={<InlineSpinner />}>
          <CommentsList postId={data._id} />
        </Suspense>
      )}
    </article>
  );
}

export default Post;

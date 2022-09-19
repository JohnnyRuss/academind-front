import { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import { usePostQuery, useForeignUser } from '../../../hooks';

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

  const belongsToActiveUser = useForeignUser(data?.author?._id);

  return (
    <article className={`${styles.post} ${className || ''}`}>
      {startDeletion && loading === true && <InlineStandSpinner />}
      <OptionsBig
        keyWord='post'
        {...({ options } || '')}
        restriction={belongsToActiveUser}
        optBtnClassName={styles.postOptionsBtn}
        deleteHandler={() => deletePostHandler(data._id)}
        updateHandler={() =>
          activateUpdatePostModal({
            _id: data._id,
            shared: data.shared,
            authenticAuthorId: data?.authenticAuthor?._id,
            authenticAuthorImg: data?.authenticAuthor?.profileImg,
            authenticAuthorName: data?.authenticAuthor?.userName,
            createdAt: data.createdAt,
            description: data?.description,
            authenticDescription: data?.authenticDescription,
            media: data.media,
            type: data.type,
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

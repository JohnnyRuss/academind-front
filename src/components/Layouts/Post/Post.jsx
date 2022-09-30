import { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import { usePostQuery } from '../../../hooks';

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
        savePostHandler={() => savePostHandler(data._id)}
        deleteHandler={() => deletePostHandler(data._id)}
        updateHandler={() =>
          activateUpdatePostModal({
            _id: data._id,
            shared: data.shared,
            authenticAuthorId: data?.authenticAuthor?._id,
            authenticAuthorImg: data?.authenticAuthor?.profileImg,
            authenticAuthorName: data?.authenticAuthor?.userName,
            tags: data?.tags,
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
          data={{
            authorId: data.author._id,
            authorName: data.author.userName,
            authorImg: data.author.profileImg,
            description: data.description,
            createdAt: data.createdAt,
            tags: data.tags,
          }}
        />
      )}
      <PostAuthentic
        type={data.type}
        authenticType={data.authenticType}
        shared={data.shared}
        activatePostMediaHandler={activatePostMediaHandler}
        data={{
          author: {
            _id: data.shared ? data.authenticAuthor._id : data.author._id,
            userName: data.shared ? data.authenticAuthor.userName : data.author.userName,
            profileImg: data.shared ? data.authenticAuthor.profileImg : data.author.profileImg,
          },
          createdAt: data.shared ? data.authenticDateCreation : data.createdAt,
          description: data.shared ? data.authenticDescription : data.description,
          tags: data.tags,
          authenticTags: data.authenticTags,
          media: data.media,
          comments: data.commentsCount,
          article: data.article,
          title: data.title,
          categories: data.categories,
          authenticId: data.authenticId,
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

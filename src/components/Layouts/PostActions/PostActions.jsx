import { usePostQuery, usePost } from '../../../hooks';

import styles from './components/styles/postActions.module.scss';
import { LikeBTN, DislikeBTN, CommentBTN, ShareBTN } from './components';

/**
 * like dislike share and comment buttons
 * @param {*}
 * @returns
 */
function PostActions({ className, setShowCommnents, data, redirect }) {
  const { reactOnPostHandler } = usePostQuery();
  const { activateSharePostModal } = usePost();

  function handleShowComment(e) {
    e.preventDefault();
    setShowCommnents((prevState) => !prevState);
  }

  function reactionHandler(e) {
    e.preventDefault();
    reactOnPostHandler({
      postReaction: e.currentTarget.dataset.reaction,
      postId: data._id,
    });
  }

  function shareHandler(e) {
    e.preventDefault();
    activateSharePostModal({
      _id: data._id,
      type: data.type,
      userName: data.author.userName,
      userImg: data.author.profileImg,
      createdAt: data.createdAt,
      description: data.description,
      media: data.media,
      shareDescription: data.authenticDescription,
      // ?? -> comments
      comments: data.comments,
      //for blog share
      article: data.article,
      title: data.title,
    });
  }

  return (
    <form className={`${styles.postActions} ${className || ''}`}>
      <LikeBTN
        reactOnPostHandler={reactionHandler}
        reactions={data?.reactions}
        likesAmount={data?.likesAmount}
      />
      <DislikeBTN
        reactOnPostHandler={reactionHandler}
        reactions={data?.reactions}
        dislikesAmount={data?.dislikesAmount}
      />
      <CommentBTN
        redirect={redirect}
        commentsAmount={data?.commentsAmount}
        setShowCommnents={setShowCommnents}
        handleShowComment={handleShowComment}
      />
      <ShareBTN shareHandler={shareHandler} />
    </form>
  );
}

export default PostActions;

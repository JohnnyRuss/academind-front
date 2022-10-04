import { usePostQuery, usePost } from '../../../hooks';
import { destructurePostShareData } from '../../../lib/destructurers';

import styles from './components/styles/postActions.module.scss';
import { LikeBTN, DislikeBTN, CommentBTN, ShareBTN } from './components';

/**
 * is user in Post component as well as BlogPost component
 * like, dislike, share and comment buttons.
 * @param {*}
 * @param {*} setShowCommnents attached on comment button and sets as !prevState
 * @param {*} data object of data {_id,type,userName,userImg,createdAt,description,media, authenticDescription,commentsCount,article,title}. this information will be send to redux portalReducer when user clicks share button
 * @param {boolean} redirect basically this prop is for BlogPost on The Blog Feed. if redirect is true and user clicks on comment button user will be redirected through the ActiveBlogPost
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
    activateSharePostModal(destructurePostShareData(data));
  }

  return (
    <form className={`${styles.postActions} ${className || ''}`}>
      <LikeBTN reactOnPostHandler={reactionHandler} likesAmount={data?.likesAmount} />
      <DislikeBTN reactOnPostHandler={reactionHandler} dislikesAmount={data?.dislikesAmount} />
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

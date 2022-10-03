import { usePostQuery, usePost } from '../../../hooks';

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
    activateSharePostModal({
      _id: data._id,
      type: data.type,
      author: {
        userName: data.shared ? data.authentic.author.userName : data.author.userName,
        profileImg: data.shared ? data.authentic.author.profileImg : data.author.profileImg,
      },
      createdAt: data.createdAt,
      description: data.shared ? data.authentic.description : data.description,
      media: data.shared ? data.authentic.media : data.media,
      tags: [],
      authenticTags: data.shared ? data.authentic.tags : data.tags,
      //for blog share
      article: data.shared ? data.authentic?.article : data.article,
      title: data.shared ? data.authentic.title : data.title,
      categories: data.shared ? data.authentic.categories : data.categories,
      authenticType: data.shared ? data.authentic?.type : data.type,
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

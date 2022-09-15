import { UserIdentifier } from '..';
import { PostDescription, PostMedia } from './components';
import { BlogPost } from '..';
import styles from './components/styles/postAuthentic.module.scss';

/**
 * @Intro this element has couple of use case, all of them are described below but in general and common to all, this element shows user avatar, post description and post media files if post is shared or not, but if post is shared, post authentic information will be rendered in wrapper box in different order under the root element (classNamed-"shareAuthentic"). This className defines elements row order, if this div has not this className, elements row will be rendered in standard order. After All this element checks post type post||blogPost and shows up appropriate element RegullarPost||BlogPost. Both of the information, TYPE and SHARED, must be passed as a prop in all the cases.
 * @USE_CASES this component is used in three different Component -: Post, UpdatePostPortal and SharePostPortal
 * @Post into the Post component this element behaves as described in intro, you must pass TYPE and SHARED props based on your information and PostAuthentic will return appropriate element RegullarPost||BlogPost. when you are using this component in Post component you have to pass activatePostMediaHandler prop as well.
 * @UPDATE_POST_PORTAL into this component we need different order of containing blocks, we don't need UserIdentifier and PostDescription but we still need PostMedia and even the BlogPost to be rendered. So we have to pass proccessUpdate prop as True and base on that prop PostAuthentic component will separate only the components we need. this props even restricts activatePostMediaHandler event !!!
 * @SHARE_POST_PORTAL into this component this element almost behaves as described in intro, you must pass TYPE and SHARED props as well, and SHARED prop must be the True to get correct order of element rows and you have to pass proccessShare prop as True to restrict activatePostMediaHandler event !!!
 * @param {Boolean} shared is a Boolean value, base on that value elements will be rendered in different order
 * @param {String} type defines post type post||blogPost and base on that returns appropriate elment
 * @param {function} activatePostMediaHandler passed on mediaFiles as onClick event and activates postMedia Modal
 * @param {Object} data this props is common for all the usecases but may be contained with different information. data prop passed from Post component have to contain next fields-: {userName, createdAt, userImg, description,  media, article, shareAuthor, shareAuthorImg, shareDescription, title, comments} ! from SharePostPortal -: {userName, createdAt, userImg, description, type, media} ! from UpdatePostPortal -: {type, media, description}
 * @param {Boolean} proccessShare have to pass be passed proccessShare prop as True to restrict activatePostMediaHandler event
 * @param {Boolean} proccessUpdate have to be passed as True and base on that prop PostAuthentic component will separate and returns only the components we need. this props even restricts activatePostMediaHandler event !!!
 * @returns
 */
function PostAuthentic({
  shared,
  type,
  activatePostMediaHandler,
  data,
  proccessShare,
  proccessUpdate,
}) {
  return (
    <div className={shared ? styles.shareAuthentic : styles.postBody} data-post-authentic>
      {type === 'post' ? (
        <>
          {!proccessUpdate && (
            <>
              <UserIdentifier
                userId={shared ? data.authenticAuthorId : data.authorId}
                userName={shared ? data.authenticAuthorName : data.authorName}
                timeAgo={shared ? data.authenticDateCreation : data.createdAt}
                img={shared ? data.authenticAuthorImg : data.authorImg}
                className={styles.identifier}
              />
              <PostDescription
                description={shared ? data.authenticDescription : data.description}
                className={styles.description}
              />
            </>
          )}
          {data.media && (
            <PostMedia
              activateMedia={
                !proccessShare || !proccessUpdate ? activatePostMediaHandler : () => {}
              }
              media={data.media}
              className={styles.media}
            />
          )}
        </>
      ) : (
        <BlogPost post={data} limitation={550} options={false} />
      )}
    </div>
  );
}

export default PostAuthentic;

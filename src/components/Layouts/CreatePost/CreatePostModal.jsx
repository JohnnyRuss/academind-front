import { useSelector, useDispatch } from 'react-redux';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';
import { removeFiles } from '../../../store/reducers/createPostReducer';
import { removeUpdateFiles } from '../../../store/reducers/portalReducer';

import styles from './components/styles/createPostModal.module.scss';
import { Modal, UserIdentifier, PostAuthentic } from '../';
import { BTN, TextField, InlineStandSpinner } from '../../Interface';
import { CreatePostMedia, CreatePostTouch } from './components';

function CreatePostModal({
  isOpen,
  setIsOpen,
  defaultDescription,
  handleDescription,
  handlePost,
  loading,
}) {
  const dispatch = useDispatch();

  const { userName, image, id } = useSelector(selectActiveUserInfo);

  /*
 because of <CreatePostModal> is used in <CreatePost> as well as in <UpdatePostPortal> we need to prevent incorect or unnecessary data set. Both of the process is controlled by different reducers, so we need the way and we have the condition which says if there are updating process then go and remove media files from portalReducer (i.e for <UpdatePostPortal>), otherwise remove files from createPostReducer(i.e for <CreatePost>). Based on the process update||create even is rendered different components <CreatePostMedia> or <PostAuthentic> because we dont want to manipuate on media files when we are updating shared post, because this media files back in the hood belong to authentic post which was shared, and media files itself takes one place in memory on the server for authentic post as well as for posts which were created from authentic post(i.e were shared)
  */

  const { isOpen: createPostIsOpen, files: createPostFiles } = useSelector(
    ({ createPost }) => createPost
  );
  
  const {
    updatePostModalIsOpen,
    updatePostMediaFiles,
    updatePostData: {
      shared,
      type,
      authenticDescription,
      authenticAuthorImg,
      authenticAuthorName,
      createdAt,
    },
  } = useSelector(({ portal }) => portal);

  const files = createPostIsOpen
    ? createPostFiles
    : updatePostModalIsOpen
    ? updatePostMediaFiles
    : [];

  const handleDiscardMedia = (url) => {
    updatePostModalIsOpen && dispatch(removeUpdateFiles(url));
    createPostIsOpen && dispatch(removeFiles(url));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={styles.createPostModal}>
      <div className={styles.createPostModalContentBox}>
        {loading && <InlineStandSpinner />}
        <UserIdentifier
          img={image}
          userName={userName}
          userId={id}
          withTime={false}
          className={styles.createPostHeader}
        />
        <div className={styles.content}>
          <TextField
            placeholder="what's on your mind ?"
            className={styles.postTextField}
            focus={true}
            maxRows={8}
            minRows={4}
            defaultValue={defaultDescription}
            onChange={handleDescription}
          />
          {!shared && <CreatePostMedia files={files} handleDiscardMedia={handleDiscardMedia} />}
          {shared && (
            <PostAuthentic
              shared={shared}
              type={type}
              proccessUpdate={true}
              data={{
                userId: '',
                userName: authenticAuthorName,
                createdAt: createdAt,
                userImg: authenticAuthorImg,
                description: authenticDescription,
                media: updatePostMediaFiles,
              }}
            />
          )}
        </div>
        <div className={styles.createPostFooterBox}>
          <CreatePostTouch withTextField={false} />
          <BTN onClick={handlePost} disabled={loading} className={styles.postBtn}>
            POST
          </BTN>
        </div>
      </div>
    </Modal>
  );
}

export default CreatePostModal;

import { useSelector } from 'react-redux';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';

import styles from './components/styles/createPostModal.module.scss';
import { Modal, UserIdentifier, PostAuthentic, TextAreaWithTag } from '../';
import { BTN, InlineStandSpinner } from '../../Interface';
import { CreatePostMedia, CreatePostTouch } from './components';

function CreatePostModal({
  isOpen,
  setIsOpen,
  text,
  setText,
  tags,
  handleTag,
  handleRemoveTag,
  files,
  handleDiscardMedia,
  updateCredentials = {},
  handlePost,
  loading,
}) {
  const { userName, image, id } = useSelector(selectActiveUserInfo);

  const { shared, type, authenticDescription, authenticAuthorImg, authenticAuthorName, createdAt } =
    updateCredentials;

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
          <TextAreaWithTag
            text={text}
            setText={setText}
            placeholder="what's on your mind ?"
            className={styles.postTextField}
            tags={tags}
            setTag={handleTag}
            removeTag={handleRemoveTag}
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
                media: files,
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

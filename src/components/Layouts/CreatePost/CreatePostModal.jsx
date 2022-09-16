import styles from './components/styles/createPostModal.module.scss';
import { Modal, UserIdentifier } from '../';
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
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={styles.createPostModal}>
      <div className={styles.createPostModalContentBox}>
        {loading && <InlineStandSpinner />}
        <UserIdentifier
          img='/img/user-4.jpg'
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
          <CreatePostMedia />
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

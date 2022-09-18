import { useSelector } from 'react-redux';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';

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
  const { userName, image, id } = useSelector(selectActiveUserInfo);
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

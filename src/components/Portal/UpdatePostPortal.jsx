import { useSelector, useDispatch } from 'react-redux';

import { deactivateUpdatePostModal } from '../../store/reducers/portalReducer';

import { useRestrictBodyOverflow } from '../../hooks';

import styles from './updatePostPortal.module.scss';
import { UserIdentifier, PostAuthentic, Modal } from '../Layouts';
import { TextField, BTN } from '../Interface';

function UpdatePostPortal() {
  const dispatch = useDispatch();
  const { restrictScroll } = useRestrictBodyOverflow();
  const { updatePostModalIsOpen, updatePostData } = useSelector(({ portal }) => portal);

  const deactivateHandler = () => dispatch(deactivateUpdatePostModal());

  async function updateHandler() {
    const { description } = updatePostData;
    try {
      // updatePotsHandler({ variables: { description } });
    } catch (error) {
      console.log({ error: error.message, location: 'UpdatePostPortal' });
    } finally {
      deactivateHandler();
      restrictScroll(false);
    }
  }

  return (
    <Modal
      isOpen={updatePostModalIsOpen}
      setIsOpen={deactivateHandler}
      extraStyles={{ background: 'white' }}>
      <div className={styles.sharePostModal}>
        <UserIdentifier withTime={false} className={styles.shareIdentifier} />
        <TextField
          className={styles.descriptionField}
          minRows={4}
          maxRows={8}
          defaultValue={updatePostData.description}
          placeholder='description'
        />
        <PostAuthentic
          shared={false}
          proccessUpdate={true}
          type={updatePostData.type}
          data={{
            media: updatePostData.media,
            shareDescription: updatePostData.shareDescription,
            title: updatePostData.title,
            article: updatePostData.article,
            comments: updatePostData.comments,
          }}
        />
        <span className={styles.btnWrapper}>
          <BTN className={styles.confirmShareBtn} onClick={updateHandler}>
            post
          </BTN>
        </span>
      </div>
    </Modal>
  );
}

export default UpdatePostPortal;

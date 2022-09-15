import { useSelector, useDispatch } from 'react-redux';

import { deactivateSharePostModal } from '../../store/reducers/portalReducer';

import { useRestrictBodyOverflow } from '../../hooks';

import { Modal, PostAuthentic, UserIdentifier } from '../Layouts';
import { TextField, BTN } from '../Interface';
import styles from './sharePostPortal.module.scss';

function SharePostPortal() {
  const dispatch = useDispatch();
  const { restrictScroll } = useRestrictBodyOverflow();
  const { sharePostModalIsOpen, sharePostData } = useSelector(({ portal }) => portal);

  const deactivateHandler = () => dispatch(deactivateSharePostModal());

  async function shareHandler() {
    const { description, _id } = sharePostData;
    try {
      // sharePotsHandler({ variables: { description, postId:_id } });
    } catch (error) {
      console.log({ error: error.message, location: 'SharePostPortal' });
    } finally {
      deactivateHandler();
      restrictScroll(false);
    }
  }

  return (
    <Modal
      isOpen={sharePostModalIsOpen}
      setIsOpen={deactivateHandler}
      extraStyles={{ background: 'white' }}>
      <div className={styles.sharePostModal}>
        <UserIdentifier withTime={false} className={styles.shareIdentifier} />
        <TextField
          className={styles.descriptionField}
          minRows={4}
          maxRows={8}
          placeholder='description'
        />
        <PostAuthentic
          shared={true}
          type={sharePostData.type}
          data={sharePostData}
          proccessShare={true}
        />
        <span className={styles.btnWrapper}>
          <BTN className={styles.confirmShareBtn} onClick={shareHandler}>
            post
          </BTN>
        </span>
      </div>
    </Modal>
  );
}

export default SharePostPortal;

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resetSharePostModal } from '../../store/reducers/portalReducer';
import { useRestrictBodyOverflow, usePostQuery } from '../../hooks';
import { selectActiveUserInfo } from '../../store/selectors/userSelectors';

import { Modal, PostAuthentic, UserIdentifier } from '../Layouts';
import { TextField, BTN, InlineStandSpinner } from '../Interface';
import styles from './styles/sharePostPortal.module.scss';

function SharePostPortal() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const {
    sharePostModalIsOpen,
    sharePostData,
    sharePostLoadingState: { loading },
  } = useSelector(({ portal }) => portal);
  const { userName, image } = useSelector(selectActiveUserInfo);

  const deactivateHandler = () => dispatch(resetSharePostModal());

  const { sharePostHandler } = usePostQuery();

  const { restrictScroll } = useRestrictBodyOverflow();
  useEffect(() => {
    return () => restrictScroll(false);
  }, []);

  return (
    <Modal
      isOpen={sharePostModalIsOpen}
      setIsOpen={deactivateHandler}
      extraStyles={{ background: 'white' }}>
      {loading && <InlineStandSpinner />}
      <div className={styles.sharePostModal}>
        <UserIdentifier
          img={image}
          userName={userName}
          withTime={false}
          className={styles.shareIdentifier}
        />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
          <BTN
            className={styles.confirmShareBtn}
            onClick={() => sharePostHandler(sharePostData._id, { description })}>
            post
          </BTN>
        </span>
      </div>
    </Modal>
  );
}

export default SharePostPortal;

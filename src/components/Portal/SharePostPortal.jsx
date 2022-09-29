/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  resetSharePostModal,
  addShareTag,
  removeShareTag,
} from '../../store/reducers/portalReducer';
import { useRestrictBodyOverflow, usePostQuery } from '../../hooks';
import { selectActiveUserInfo } from '../../store/selectors/userSelectors';

import { Modal, PostAuthentic, UserIdentifier, TextAreaWithTag } from '../Layouts';
import { BTN, InlineStandSpinner } from '../Interface';
import styles from './styles/sharePostPortal.module.scss';

function SharePostPortal() {
  const dispatch = useDispatch();

  const { userName, image } = useSelector(selectActiveUserInfo);

  const {
    sharePostModalIsOpen,
    sharePostData,
    sharePostLoadingState: { loading },
  } = useSelector(({ portal }) => portal);

  const [text, setText] = useState('');

  const handleTag = (tag) => dispatch(addShareTag(tag));

  const handleRemoveTag = (id) => dispatch(removeShareTag(id));

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
        <TextAreaWithTag
          text={text}
          setText={setText}
          tags={sharePostData.tags}
          setTag={handleTag}
          removeTag={handleRemoveTag}
          placeholder='description'
          className={styles.descriptionField}
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
            onClick={() =>
              sharePostHandler(sharePostData._id, { description: text, tags: sharePostData?.tags })
            }>
            post
          </BTN>
        </span>
      </div>
    </Modal>
  );
}

export default SharePostPortal;
